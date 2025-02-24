import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { Provider } from "@/components/ui/provider";
import { BrowserRouter, Routes, Route } from "react-router";
import Login from "./pages/auth";
import TopContainer from "./pages/topContainer";
import SignUp from "./pages/signup";


const rootElement = document.getElementById("root")!;
const root = ReactDOM.createRoot(rootElement);



root.render(
  <BrowserRouter>
    <Provider>
      <div className="h-screen overflow-auto flex flex-col bg-slate-100 dark:bg-slate-900">
       
        <div className="flex-grow">
         <App />
        </div>
      </div>
    </Provider>
  </BrowserRouter>
);
