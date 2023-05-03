import {
  Link,
  Outlet,
  Route,
  Routes,
  useMatch,
  useParams,
} from "react-router-dom";
import { usePageRepository } from "../repository/usePageRepository";
import { PageBreadcrumb } from "./components/PageBreadcrumb";
import { useEffect, useState } from "react";
import { isDefined } from "../utility/isDefined";
import { IPage } from "./models/Page";
import { PageSubRoute } from "./models/PageSubRoutes";

enum PageMode {
  View = "view",
  Create = "create",
  Edit = "edit",
}

function PageHeader(props: PageLoadingData) {
  const { mode, subRoute } = usePageRouteData();
  const { item: page } = props;
  if (!page) return null;
  console.log(mode);
  return (
    <>
      <PageBreadcrumb {...props} subRoute={subRoute} />
      <ul>
        <li>
          {mode === PageMode.View ? (
            <Link to={PageSubRoute.Properties} relative="path">
              Properties
            </Link>
          ) : (
            <Link to={PageSubRoute.Parameters} relative="path">
              Parameters
            </Link>
          )}
        </li>
        <li>
          {mode === PageMode.View ? (
            <Link to={page.uriToEdit()}>Edit</Link>
          ) : (
            <Link to={page.uriToView()}>View</Link>
          )}
        </li>
      </ul>
    </>
  );
}

type PageLoadingData =
  | { item: undefined; hasLoaded: false; status: "idle" }
  | { item: undefined; hasLoaded: false; status: "fetching" }
  | { item?: IPage; hasLoaded: true; status: "success" }
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
        if (isDefined(routeData.pageId)) {
          const page = await pageRepository.loadById(routeData.pageId);
          setPageData({ hasLoaded: true, item: page, status: "success" });
        } else if (isDefined(routeData.pageName)) {
          const page = await pageRepository.loadByName(routeData.pageName);
          setPageData({ hasLoaded: true, item: page, status: "success" });
        } else {
          setPageData({
            hasLoaded: true,
            item: undefined,
            status: "failed",
            error:
              "Required route data not found: pageId, or pageName must be in the route.",
          });
        }
      }
    }
    loadPages();
  }, [pageData, pageRepository, routeData]);

  function renderContent() {
    if (!pageData.hasLoaded) {
      return <>Loading</>;
    }
    if (pageData.status == "failed") {
      return <>Error: {pageData.error}</>;
    }
    return <Outlet />;
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

type PageRouteData = {
  mode: PageMode;
  pageId?: string;
  pageName?: string;
  subRoute?: PageSubRoute;
};

function usePageRouteData(): PageRouteData {
  const createPageMatch = useMatch({
    path: `/pages/create`,
  });
  const viewPageMatch = useMatch({
    path: `/pages/view/:pageName/*`,
  });
  const editPageMatch = useMatch({
    path: `/pages/edit/:pageId/*`,
  });
  const { pageId, pageName } = useParams();
  let mode: PageMode | undefined;
  let subRoute: PageSubRoute | undefined;
  if (viewPageMatch) {
    mode = PageMode.View;
    if (viewPageMatch.pathname.endsWith(PageSubRoute.Properties)) {
      subRoute = PageSubRoute.Properties;
    }
  } else if (createPageMatch) {
    mode = PageMode.Create;
    if (createPageMatch.pathname.endsWith(PageSubRoute.Parameters)) {
      subRoute = PageSubRoute.Parameters;
    }
  } else if (editPageMatch) {
    mode = PageMode.Edit;
    if (editPageMatch.pathname.endsWith(PageSubRoute.Parameters)) {
      subRoute = PageSubRoute.Parameters;
    }
  } else {
    throw new Error("Invalid route");
  }

  return { mode, pageId, pageName, subRoute };
}
