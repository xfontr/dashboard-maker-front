import { Suspense } from "react";
import useRefreshToken from "../../../features/users/hooks/useRefreshToken";
import useUserAuth from "../../../features/users/store/userAuth.hook";
import Routes from "../Routes/Routes";
import "./App.scss";

const App = (): JSX.Element => {
  const {
    userAuth: { role },
  } = useUserAuth();

  useRefreshToken();

  return (
    <div className="app">
      <Suspense>
        <Routes {...{ role }} />
      </Suspense>
    </div>
  );
};

export default App;
