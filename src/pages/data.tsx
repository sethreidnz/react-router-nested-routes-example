import { Link } from "react-router-dom";
import { Page } from "../repository/pageRepository";

export const pages: Array<Page> = [
  {
    id: "1",
    title: "Page 1",
    content: (
      <>
        <Link to={`/pages/2/view`}>This is a link to page 2</Link>
      </>
    ),
  },
  {
    id: "2",
    title: "Page 2",
    content: (
      <>
        <Link to={`/pages/3/view`}>This is a link to page 3</Link>
      </>
    ),
  },
  {
    id: "3",
    title: "Page 3",
    content: (
      <>
        <Link to={`/pages/1/view`}>This is a link to page 1</Link>
      </>
    ),
  },
];
