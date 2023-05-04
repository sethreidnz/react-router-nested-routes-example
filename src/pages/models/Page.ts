import { PageSearchParams } from "./PageSearchParams";
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

  public uriToView(): string {
    return `/pages/${this.name}`;
  }

  public uriToEdit(): string {
    return `${this.uriToView()}?${PageSearchParams.PageId}=${this.id}&${
      PageSearchParams.Mode
    }=edit`;
  }
}
