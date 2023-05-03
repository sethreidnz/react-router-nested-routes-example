import { useParams, Routes, Route, Link } from "react-router-dom";
import { usePageRepository } from "../repository/usePageRepository";
import { PageSubRoute } from "./models/PageSubRoutes";

export function PageEdit() {
  const pageRepository = usePageRepository();
  const { pageId } = useParams();

  if (!pageId) {
    return null;
  }

  const page = pageRepository.getById(pageId);
  if (!page) {
    return null;
  }
  return (
    <div>
      <Routes>
        <Route
          index
          element={
            <div>
              <h1>Editing - {page.name}</h1>
              {page.content}
            </div>
          }
        />
        <Route
          path={PageSubRoute.Parameters}
          element={
            <>
              <Link to=".." relative="path">
                Back to page
              </Link>
              <h2>Page Parameters</h2>
            </>
          }
        />
      </Routes>
    </div>
  );
}
