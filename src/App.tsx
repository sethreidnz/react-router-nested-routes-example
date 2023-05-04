import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PageContainer } from "./pages/PageContainer";
import { Home } from "./home/Home";
import { PageRepositoryProvider } from "./repository/RepositoryContext";

function App() {
  return (
    <PageRepositoryProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pages/:pageName/*" element={<PageContainer />}></Route>
        </Routes>
      </BrowserRouter>
    </PageRepositoryProvider>
  );
}

export default App;
