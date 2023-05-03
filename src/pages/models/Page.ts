import { PageSubRoute } from "./PageSubRoutes";

export interface IPage {
  id: string;
  name: string;
  content: JSX.Element;
  uriToView(subRoute?: PageSubRoute): string;
  uriToEdit(subRoute?: PageSubRoute): string;
}

export class Page implements IPage {
  constructor(
    public id: string,
    public name: string,
    public content: JSX.Element
  ) {}

  static uriToCreate(): string {
    return `/pages/create`;
  }

  public uriToView(subRoute?: PageSubRoute): string {
    const subRoutePath = subRoute ? `/${subRoute}` : "";
    return `/pages/view/${this.name}${subRoutePath}`;
  }

  public uriToEdit(subRoute?: PageSubRoute): string {
    const subRoutePath = subRoute ? `/${subRoute}` : "";
    return `/pages/edit/${this.id}${subRoutePath}`;
  }
}
