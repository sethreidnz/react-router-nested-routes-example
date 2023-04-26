import { Link, Route, Routes, useMatch, useParams } from "react-router-dom";
import { PageEdit } from "./PageEdit";
import { PageView } from "./PageView";
import { Page } from "../repository/pageRepository";
import { usePageRepository } from "../repository/usePageRepository";
import { PageBreadcrumb } from "../components/Breadcrumb";
import { PageParameters } from "./PageParameters";

enum PageSubRoute {
  View = "view",
  Edit = "edit",
  Parameters = "parameters",
}

function PageHeader({ page }: { page: Page }) {
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
      <PageBreadcrumb page={page} subRoute={getSubRoute()} />
      <h2>{page.title}</h2>
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

export function PageContainer() {
  const pageRepository = usePageRepository();
  const { pageId } = useParams();

  if (!pageId) {
    return null;
  }

  const page = pageRepository.get(pageId);
  if (!page) {
    return null;
  }

  return (
    <>
      <PageHeader page={page} />
      <Routes>
        <Route index element={<PageView />} />
        <Route path={PageSubRoute.View} element={<PageView />} />
        <Route path={PageSubRoute.Edit} element={<PageEdit />} />
        <Route path={PageSubRoute.Parameters} element={<PageParameters />} />
      </Routes>
    </>
  );
}
