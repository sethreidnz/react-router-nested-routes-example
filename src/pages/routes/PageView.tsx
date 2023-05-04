import { IPage } from "../models/Page";
import { PageMode } from "../models/PageMode";

type PageViewProps = {
  page: IPage;
  mode: PageMode;
};

export function PageView({ page, mode }: PageViewProps) {
  const title =
    mode === PageMode.View
      ? `${page.name} - Viewing`
      : `${page.name} - Editing`;
  return (
    <div>
      <h1>{title}</h1>
      {page.content}
    </div>
  );
}
