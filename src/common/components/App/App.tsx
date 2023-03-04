import { Suspense, useEffect, useState } from "react";
import useRefreshToken from "../../../features/users/hooks/useRefreshToken";
import useUserAuth from "../../../features/users/store/userAuthSlice/userAuth.hook";
import Routes from "../Routes/Routes";
import "./App.scss";

const App = (): JSX.Element => {
  const [hasRefreshed, setRefresh] = useState<boolean>(false);
  const {
    userAuth: { role },
  } = useUserAuth();

  const refresh = useRefreshToken();

  useEffect(() => {
    (async () => {
      await refresh();
      setRefresh(true);
    })();
  }, [refresh]);

  return !hasRefreshed ? (
    <></>
  ) : (
    <div className="app">
      <Suspense>
        <Routes {...{ role }} />
      </Suspense>
    </div>
  );
};

export default App;
