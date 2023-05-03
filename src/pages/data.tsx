import { Link } from "react-router-dom";
import { IPage, Page } from "./models/Page";

export const pages: Array<IPage> = [
  new Page(
    "1",
    "Page 1",
    (
      <>
        <Link to={`/pages/view/Page 1`}>This is a link to page 2</Link>
      </>
    )
  ),
  new Page(
    "2",
    "Page 2",
    (
      <>
        <Link to={`/pages/view/Page 3`}>This is a link to page 3</Link>
      </>
    )
  ),
  new Page(
    "3",
    "Page 3",
    (
      <>
        <Link to={`/pages/view/Page 1`}>This is a link to page 1</Link>
      </>
    )
  ),
];
