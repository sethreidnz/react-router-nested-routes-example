import { wait } from "../utility/wait";
import { pages } from "../pages/data";

export type Page = {
  id: string;
  title: string;
  content: JSX.Element;
};

export interface IPageRepository {
  get(pageId: string): Page | undefined;
  load(pageId: string): Promise<Page | undefined>;
  getAll(): Promise<Array<Page>>;
}

async function fetchPage(pageId: string) {
  await wait(1000);
  const fetchedPage = pages.find((page) => page.id === pageId);
  return fetchedPage;
}

async function fetchPages() {
  await wait(1000);
  return pages;
}

export class PageRepository implements IPageRepository {
  private cachedPages: Map<string, Page> = new Map();

  public get(pageId: string): Page | undefined {
    const cachedPage = this.cachedPages.get(pageId);
    if (cachedPage) {
      return cachedPage;
    } else {
      return undefined;
    }
  }

  public async load(pageId: string): Promise<Page | undefined> {
    const cachedPage = this.get(pageId);
    if (cachedPage) {
      return cachedPage;
    } else {
      const fetchedPage = await fetchPage(pageId);
      if (fetchedPage) {
        this.cachedPages.set(pageId, fetchedPage);
        return this.cachedPages.get(pageId);
      } else {
        return undefined;
      }
    }
  }

  public async getAll(): Promise<Array<Page>> {
    return await fetchPages();
  }
}
