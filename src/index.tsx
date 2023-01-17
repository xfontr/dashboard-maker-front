import "./index.scss";
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./common/components/App/App";
import { BrowserRouter } from "react-router-dom";
import Store from "./common/store/store";

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Store>
        <App />
      </Store>
    </BrowserRouter>
  </React.StrictMode>
);
