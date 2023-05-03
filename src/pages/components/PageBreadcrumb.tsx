import { PageLoadingData } from "../models/PageLoadingData";

type PageBreadcrumbProps = PageLoadingData & {
  subRoute?: string;
};

export function PageBreadcrumb({
  item,
  hasLoaded,
  subRoute,
}: PageBreadcrumbProps) {
  function renderItems() {
    if (!hasLoaded) {
      return (
        <>
          {" "}
          <li>Pages</li>
          <li>
            {">"}
            Loading...
          </li>
        </>
      );
    } else if (!item) {
      return (
        <>
          {" "}
          <li>Pages</li>
          <li>
            {">"}
            Not found
          </li>
        </>
      );
    }
    return (
      <>
        <li>Pages</li>
        <li>
          {">"}
          {item.name}
        </li>
        {subRoute && (
          <li>
            {">"}
            {subRoute}
          </li>
        )}
      </>
    );
  }
  return (
    <nav aria-label="Breadcrumb">
      <ul style={{ listStyle: "none", padding: "0", display: "flex" }}>
        {renderItems()}
      </ul>
    </nav>
  );
}
