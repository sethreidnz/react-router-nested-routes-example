import { useParams } from "react-router-dom";
import { usePageRepository } from "../repository/usePageRepository";

export function PageView() {
    const pageRepository = usePageRepository();
    const { pageId } = useParams();

  if (!pageId) {
    return null;
  }

  const page = pageRepository.get(pageId);
  if (!page) {
    return null;
  }
  return (
    <div>
      <h2>Page Content</h2> {page.content}
    </div>
  );
}
