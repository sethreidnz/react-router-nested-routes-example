import { useContext } from "react";
import { IPageRepository } from "./pageRepository";
import { PageRepositoryContext } from "./RepositoryContext";

export function usePageRepository(): IPageRepository {
  const pageRepo = useContext(PageRepositoryContext);
  if (!pageRepo) {
    throw new Error(
      "usePageRepository must be used within a PageRepositoryProvider"
    );
  }
  return pageRepo;
}
