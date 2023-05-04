import { Link } from "react-router-dom";
import { usePageRepository } from "../repository/usePageRepository";
import { useEffect, useState } from "react";
import { IPage } from "../pages/models/Page";

type AllPagesData =
  | { items: Array<IPage>; hasLoaded: true }
  | { items: []; hasLoaded: false };

export function Home() {
  const pageRepository = usePageRepository();
  const [allPages, setAllPages] = useState<AllPagesData>({
    hasLoaded: false,
    items: [],
  });
  useEffect(() => {
    async function loadPages() {
      if (!allPages.hasLoaded) {
        const pages = await pageRepository.getAll();
        setAllPages({ hasLoaded: true, items: pages });
      }
    }
    loadPages();
  }, [pageRepository, allPages.hasLoaded]);

  if (!allPages.hasLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Home</h1>
      <table>
        {allPages.items.map((page) => (
          <tr>
            <td key={page.id}>{page.name}</td>
            <td key={page.id}>
              <Link to={page.uriToView()}>View</Link>
            </td>
            <td key={page.id}>
              <Link to={page.uriToEdit()}>Edit</Link>
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
}
