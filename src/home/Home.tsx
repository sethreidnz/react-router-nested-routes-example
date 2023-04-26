import { Link } from "react-router-dom";
import { usePageRepository } from "../repository/usePageRepository";
import { useEffect, useState } from "react";
import { Page } from "../repository/pageRepository";

type AllPagesData =
  | { items: Array<Page>; hasLoaded: true }
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
      <ul>
        {allPages.items.map((page) => (
          <li key={page.id}>
            <Link to={`pages/${page.id}/view`}>{page.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
