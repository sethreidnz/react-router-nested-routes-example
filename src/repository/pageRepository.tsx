import { wait } from "../utility/wait";
import { pages } from "../pages/data";
import { IPage } from "../pages/models/Page";

export interface IPageRepository {
  getById(pageId: string): IPage | undefined;
  getByName(pageName: string): IPage | undefined;
  loadById(pageId: string): Promise<IPage | undefined>;
  loadByName(pageName: string): Promise<IPage | undefined>;
  getAll(): Promise<Array<IPage>>;
}

async function fetchPageById(pageId: string) {
  await wait(1000);
  const fetchedPage = pages.find((page) => page.id === pageId);
  return fetchedPage;
}

async function fetchPageByName(pageName: string) {
  await wait(1000);
  const fetchedPage = pages.find((page) => page.name === pageName);
  return fetchedPage;
}

async function fetchPages() {
  await wait(1000);
  return pages;
}

export class PageRepository implements IPageRepository {
  private cachedPages: Map<string, IPage> = new Map();

  public getById(pageId: string): IPage | undefined {
    const cachedPage = this.cachedPages.get(pageId);
    if (cachedPage) {
      return cachedPage;
    } else {
      return undefined;
    }
  }

  public getByName(pageName: string): IPage | undefined {
    let cachedPage: IPage | undefined = undefined;
    for (const key of this.cachedPages.keys()) {
      const entry = this.cachedPages.get(key);
      if (entry?.name === pageName) {
        cachedPage = entry;
        break;
      }
    }
    if (cachedPage) {
      return cachedPage;
    } else {
      return undefined;
    }
  }

  public async loadById(pageId: string): Promise<IPage | undefined> {
    const cachedPage = this.getById(pageId);
    if (cachedPage) {
      return cachedPage;
    } else {
      const fetchedPage = await fetchPageById(pageId);
      if (fetchedPage) {
        this.cachedPages.set(pageId, fetchedPage);
        return this.cachedPages.get(pageId);
      } else {
        return undefined;
      }
    }
  }

  public async loadByName(pageName: string): Promise<IPage | undefined> {
    const cachedPage = this.getByName(pageName);
    if (cachedPage) {
      return cachedPage;
    } else {
      const fetchedPage = await fetchPageByName(pageName);
      if (fetchedPage) {
        this.cachedPages.set(fetchedPage.id, fetchedPage);
        return this.cachedPages.get(fetchedPage.id);
      } else {
        return undefined;
      }
    }
  }

  public async getAll(): Promise<Array<IPage>> {
    return await fetchPages();
  }
}
