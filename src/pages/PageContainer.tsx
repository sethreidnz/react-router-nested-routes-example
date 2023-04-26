import { Link, Route, Routes, useMatch, useParams } from "react-router-dom";
import { PageEdit } from "./PageEdit";
import { PageView } from "./PageView";
import { usePageRepository } from "../repository/usePageRepository";
import { PageBreadcrumb } from "./components/PageBreadcrumb";
import { PageParameters } from "./PageParameters";
import { useEffect, useState } from "react";
import { Page } from "../repository/pageRepository";
import { isDefined } from "../utility/isDefined";

enum PageSubRoute {
  View = "view",
  Edit = "edit",
  Parameters = "parameters",
}

function PageHeader(props: PageLoadingData) {
  const match = useMatch({
    path: `/pages/:pageId/*`,
  });
  function getSubRoute() {
    if (!match) {
      return undefined;
    }
    if (match.pathname.includes(PageSubRoute.View)) {
      return PageSubRoute.View;
    }
    if (match.pathname.includes(PageSubRoute.Edit)) {
      return PageSubRoute.Edit;
    }
    if (match.pathname.includes(PageSubRoute.Parameters)) {
      return PageSubRoute.Parameters;
    }
    return undefined;
  }
  return (
    <>
      <PageBreadcrumb {...props} subRoute={getSubRoute()} />
      <ul>
        <li>
          <Link to="view">View</Link>
        </li>
        <li>
          <Link to="edit">Edit</Link>
        </li>
        <li>
          <Link to="parameters">Parameters</Link>
        </li>
      </ul>
    </>
  );
}

type PageLoadingData =
  | { item?: Page; hasLoaded: true }
  | { item: undefined; hasLoaded: false };

export function PageContainer() {
  const pageRepository = usePageRepository();
  const { pageId } = useParams();
  const [pageData, setPageData] = useState<PageLoadingData>({
    hasLoaded: false,
    item: undefined,
  });
  useEffect(() => {
    async function loadPages() {
      if (!pageId) return;
      if (
        !pageData.hasLoaded ||
        (pageData.hasLoaded &&
          isDefined(pageData.item) &&
          pageId != pageData.item.id)
      ) {
        setPageData({ hasLoaded: false, item: undefined });
        const page = await pageRepository.load(pageId);
        setPageData({ hasLoaded: true, item: page });
      }
    }
    loadPages();
  }, [pageData.hasLoaded, pageData.item, pageId, pageRepository]);

  return (
    <>
      <PageHeader {...pageData} />
      {!pageData.hasLoaded ? (
        <>Loading</>
      ) : (
        <Routes>
          <Route index element={<PageView />} />
          <Route path={PageSubRoute.View} element={<PageView />} />
          <Route path={PageSubRoute.Edit} element={<PageEdit />} />
          <Route path={PageSubRoute.Parameters} element={<PageParameters />} />
        </Routes>
      )}
    </>
  );
}
