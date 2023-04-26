import React, { createContext } from "react";
import { IPageRepository, PageRepository } from "./pageRepository";

// Create a context object for the page repository
export const PageRepositoryContext = createContext<IPageRepository | null>(
  null
);

// A component that provides the page repository instance to its children
export function PageRepositoryProvider(props: { children: React.ReactNode }) {
  // Instantiate the page repository
  const pageRepo = new PageRepository();

  return (
    <PageRepositoryContext.Provider value={pageRepo}>
      {props.children}
    </PageRepositoryContext.Provider>
  );
}
