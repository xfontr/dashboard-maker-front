import { Suspense } from "react";
import Routes from "./common/components/Routes/Routes";

const App = (): JSX.Element => (
  <div className="app">
    <Suspense>
      <Routes role="admin" />
    </Suspense>
  </div>
);

export default App;
