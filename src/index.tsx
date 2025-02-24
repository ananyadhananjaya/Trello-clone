import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { Provider } from "@/components/ui/provider";
import { BrowserRouter, Routes, Route } from "react-router";
import Login from "./pages/auth";
import TopContainer from "./pages/topContainer";

const rootElement = document.getElementById("root")!;
const root = ReactDOM.createRoot(rootElement);
root.render(
  <BrowserRouter>
    <Provider>
      <div className="h-screen flex flex-col p-2 bg-slate-100 dark:bg-slate-900">
        <div className="flex-none">
          <TopContainer />
        </div>
        <div className="flex-grow">
          <Routes>
            <Route path="/auth" element={<Login />} />
            <Route path="/" element={<App />} />
          </Routes>
        </div>
      </div>
    </Provider>
  </BrowserRouter>
);
