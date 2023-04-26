import { Page } from "../repository/pageRepository";

export function PageBreadcrumb({
  page,
  subRoute,
}: {
  page: Page;
  subRoute?: string;
}) {
  return (
    <nav aria-label="Breadcrumb">
      <ul style={{ listStyle: "none", padding: "0", display: "flex" }}>
        <li>Pages</li>
        <li>
          {">"}
          {page.title}
        </li>
        {subRoute && (
          <li>
            {">"}
            {subRoute}
          </li>
        )}
      </ul>
    </nav>
  );
}
