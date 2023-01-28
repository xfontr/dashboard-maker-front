import { Suspense } from "react";
import useLogOut from "../../../features/users/hooks/useLogOut";
import useRefreshToken from "../../../features/users/hooks/useRefreshToken";
import useUserAuth from "../../../features/users/store/userAuth.hook";
import Button from "../Button/Button";
import Routes from "../Routes/Routes";
import "./App.scss";

const App = (): JSX.Element => {
  const {
    userAuth: { role },
  } = useUserAuth();

  const { forceRefresh } = useRefreshToken();

  const logOut = useLogOut(forceRefresh);

  return (
    <div className="app">
      <Suspense>
        <Routes {...{ role }} />
      </Suspense>
      {role !== "notLogged" && <Button onClick={logOut}>Log me out</Button>}
    </div>
  );
};

export default App;
