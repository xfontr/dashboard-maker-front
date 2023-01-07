import { Suspense } from "react";
import Routes from "../Routes/Routes";
import "./App.scss";

const App = (): JSX.Element => (
  <div className="app">
    <Suspense>
      <Routes role="admin" />
    </Suspense>
  </div>
);

export default App;
