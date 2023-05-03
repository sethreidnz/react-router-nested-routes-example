import { IPage } from "../../repository/pageRepository";

export type PageLoadingData =
  | { item?: IPage; hasLoaded: true }
  | { item: undefined; hasLoaded: false };
