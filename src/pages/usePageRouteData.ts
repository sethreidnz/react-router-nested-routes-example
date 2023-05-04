import { useMatch, useParams, useSearchParams } from "react-router-dom";
import { PageMode } from "./models/PageMode";
import { PageSubRoute } from "./models/PageSubRoutes";
import { PageSearchParams } from "./models/PageSearchParams";
import { useCallback } from "react";

export type PageRouteData = {
  mode: PageMode;
  setMode: (mode: PageMode) => void;
  pageId?: string;
  pageName?: string;
  subRoute?: PageSubRoute;
};

export function usePageRouteData(): PageRouteData {
  const { pageName } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const pageId = searchParams.get(PageSearchParams.PageId) || undefined;
  const mode =
    (searchParams.get(PageSearchParams.Mode) as PageMode) || PageMode.View;
  const match = useMatch({
    path: `/pages/:pageName/*`,
  });
  let subRoute: PageSubRoute | undefined;
  const setMode = useCallback(
    (mode: PageMode) =>
      setSearchParams((prev) => {
        prev.set(PageSearchParams.Mode, mode);
        if (pageId) {
          prev.set(PageSearchParams.PageId, pageId);
        }
        return prev;
      }),
    [setSearchParams, pageId]
  );
  if (match?.pathname.endsWith(PageSubRoute.Properties)) {
    subRoute = PageSubRoute.Properties;
  }
  if (match?.pathname.endsWith(PageSubRoute.Parameters)) {
    subRoute = PageSubRoute.Parameters;
  }
  return { mode, setMode, pageId, pageName, subRoute };
}
