import { Link, Route, Routes } from "react-router-dom";
import { usePageRepository } from "../repository/usePageRepository";
import { PageBreadcrumb } from "./components/PageBreadcrumb";
import { useEffect, useState } from "react";
import { isDefined } from "../utility/isDefined";
import { IPage } from "./models/Page";
import { PageSubRoute } from "./models/PageSubRoutes";
import { PageView } from "./routes/PageView";
import { PageParameters } from "./routes/PageParameters";
import { PageRouteData, usePageRouteData } from "./usePageRouteData";
import { PageProperties } from "./routes/PageProperties";
import { LinkWithQuery } from "./components/LinkWithQuery";

enum PageMode {
  View = "view",
  Create = "create",
  Edit = "edit",
}

function PageHeader(props: PageLoadingData) {
  const { mode, setMode, subRoute } = usePageRouteData();
  const { item: page } = props;
  if (!page) return null;
  return (
    <>
      <PageBreadcrumb {...props} subRoute={subRoute} />
      <ul>
        <li>
          <LinkWithQuery to={PageSubRoute.Properties}>Properties</LinkWithQuery>
        </li>
        <li>
          <LinkWithQuery to={PageSubRoute.Parameters}>Parameters</LinkWithQuery>
        </li>
        <li>
          {mode === PageMode.View ? (
            <button onClick={() => setMode(PageMode.Edit)}>Edit</button>
          ) : (
            <button onClick={() => setMode(PageMode.View)}>View</button>
          )}
        </li>
      </ul>
    </>
  );
}

type PageLoadingData =
  | { item: undefined; hasLoaded: false; status: "idle" }
  | { item: undefined; hasLoaded: false; status: "fetching" }
  | { item: IPage; hasLoaded: true; status: "success" }
  | { item: undefined; hasLoaded: true; status: "failed"; error: string };

export function PageContainer() {
  const pageRepository = usePageRepository();
  const routeData = usePageRouteData();
  const [pageData, setPageData] = useState<PageLoadingData>({
    status: "idle",
    hasLoaded: false,
    item: undefined,
  });
  useEffect(() => {
    async function loadPages() {
      if (shouldRefetch(routeData, pageData)) {
        setPageData({ hasLoaded: false, item: undefined, status: "fetching" });
        const page = await pageRepository.loadByIdOrName({
          pageId: routeData.pageId,
          pageName: routeData.pageName,
        });
        if (!page) {
          setPageData({
            hasLoaded: true,
            item: page,
            status: "failed",
            error: "Page not found",
          });
        } else {
          setPageData({ hasLoaded: true, item: page, status: "success" });
        }
      }
    }
    loadPages();
  }, [pageData, pageRepository, routeData]);

  function renderContent() {
    if (pageData.status == "fetching" || pageData.status == "idle") {
      return <>Loading</>;
    } else if (pageData.status == "failed") {
      return <>Error: {pageData.error}</>;
    } else {
      return (
        <Routes>
          <Route
            index
            element={<PageView page={pageData.item} mode={routeData.mode} />}
          />
          <Route path={PageSubRoute.Parameters} element={<PageParameters />} />
          <Route path={PageSubRoute.Properties} element={<PageProperties />} />
        </Routes>
      );
    }
  }

  return (
    <>
      <PageHeader {...pageData} />
      {renderContent()}
    </>
  );
}

function shouldRefetch(
  routeData: PageRouteData,
  pageLoadingData: PageLoadingData
) {
  if (pageLoadingData.status == "fetching") return false;
  if (pageLoadingData.status == "idle") return true;

  const currentPage = pageLoadingData.item;
  if (isDefined(currentPage) && isDefined(routeData.pageId)) {
    return currentPage.id != routeData.pageId;
  }
  if (isDefined(currentPage) && isDefined(routeData.pageName)) {
    return currentPage.name != routeData.pageName;
  }

  return false;
}
