import { Link } from "react-router-dom";


export type Page = {
    id: string;
    title: string;
    content: JSX.Element;
}

export interface IPageRepository {
    get(pageId: string): Page | undefined;
    getAll(): Array<Page>;
}

export class PageRepository implements IPageRepository {
    private pages: Array<Page> = [
        {id: '1', title: 'Page 1', content: <><Link to={`/pages/2/view`}>This is a link to page 2</Link></>},
        {id: '2', title: 'Page 2', content: <><Link to={`/pages/3/view`}>This is a link to page 3</Link></>},
        {id: '3', title: 'Page 3', content: <><Link to={`/pages/1/view`}>This is a link to page 1</Link></>},
    ];
    
    public get(pageId: string): Page | undefined {
        return this.pages.find(page => page.id === pageId);
    }

    public getAll(): Array<Page> {
        return this.pages;
    }
}