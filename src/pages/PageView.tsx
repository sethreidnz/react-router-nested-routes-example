import { Link, Route, Routes, useParams } from "react-router-dom";
import { usePageRepository } from "../repository/usePageRepository";
import { PageSubRoute } from "./models/PageSubRoutes";

export function PageView() {
  const pageRepository = usePageRepository();
  const { pageName } = useParams();

  if (!pageName) {
    return null;
  }

  const page = pageRepository.getByName(pageName);
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
              <h1>Viewing - {page.name}</h1>
              {page.content}
            </div>
          }
        />
        <Route
          path={PageSubRoute.Properties}
          element={
            <>
              <Link to=".." relative="path">
                Back to page
              </Link>
              <h2>Page Properties</h2>
            </>
          }
        />
      </Routes>
    </div>
  );
}
