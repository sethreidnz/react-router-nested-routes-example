import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PageContainer } from "./pages/PageContainer";
import { Home } from "./home/Home";
import { PageRepositoryProvider } from "./repository/RepositoryContext";
import { PageEdit } from "./pages/PageEdit";
import { PageView } from "./pages/PageView";

function App() {
  return (
    <PageRepositoryProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route element={<PageContainer />}>
            <Route path="/pages/create" element={<PageEdit />} />
            <Route path="/pages/view/:pageName/*" element={<PageView />} />
            <Route path="/pages/edit/:pageId/*" element={<PageEdit />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </PageRepositoryProvider>
  );
}

export default App;
