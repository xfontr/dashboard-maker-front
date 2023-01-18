import "./index.scss";
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./common/components/App/App";
import { BrowserRouter } from "react-router-dom";
import { Store } from "./common/store/StoreProvider";
import UiModal from "./common/components/UiModal/UiModal";

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Store>
        <UiModal />
        <App />
      </Store>
    </BrowserRouter>
  </React.StrictMode>
);
