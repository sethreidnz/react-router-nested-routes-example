import { Link } from "react-router-dom";
import { usePageRepository } from "../repository/usePageRepository";

export function Home() {
    const pageRepository = usePageRepository();
    const pages = pageRepository.getAll();
    return (
        <div>
            <h1>Page</h1>
            <ul>
                {pages.map(page => (
                    <li key={page.id}>
                        <Link to={`pages/${page.id}/view`}>{page.title}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}