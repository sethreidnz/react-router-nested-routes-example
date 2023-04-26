import { Page } from "../../repository/pageRepository";

export type PageLoadingData =
  | { item?: Page; hasLoaded: true }
  | { item: undefined; hasLoaded: false };
