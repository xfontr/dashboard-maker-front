import { useCallback, useEffect, useState } from "react";
import { api } from "../../../common/services/RequestHandler";
import ENDPOINTS from "../../../config/endpoints";
import {
  logInActionCreator,
  logOutActionCreator,
  setRefreshTokenActionCreator,
} from "../store/userAuthSlice/userAuth.slice";
import useUserAuth from "../store/userAuthSlice/userAuth.hook";
import { CodedToken } from "../types/token.types";
import decodeToken from "../utils/decodeToken";
import useQuery from "../../../common/hooks/useQuery";
import { StoredUser } from "../types/user.types";
import { setDataActionCreator } from "../store/userDataSlice/userData.slice";
import useUserData from "../store/userDataSlice/userData.hook";
import useLogOut from "./useLogOut";
import { LOG_IN_UI } from "../config/ui.constants";
import { requestUserData } from "./useLogIn";

const refreshTokenRequest = async () =>
  await api.get<CodedToken>(ENDPOINTS.users.refreshToken, {
    withCredentials: true,
  });

// TODO: Test the last implementations of set data etc

const useRefreshToken = () => {
  const { dispatch } = useUserAuth();
  const { dispatch: dispatchData } = useUserData();
  const [fetchedToken, setToken] = useState<string>();
  const logOut = useLogOut();

  const [isLogging, setIsLogging] = useState<boolean>(true);

  const setUserData = useQuery<{ user: StoredUser }, StoredUser>({
    onSuccess: async (data) => {
      dispatchData(setDataActionCreator(data.body!.user));
    },
    onError: logOut,
    options: { ...LOG_IN_UI, loading: undefined },
  });

  useEffect(() => {
    if (!fetchedToken) return;
    setUserData(() => requestUserData(fetchedToken))();
    setToken(undefined);
  }, [fetchedToken, setUserData]);

  return useCallback(async () => {
    const response = await refreshTokenRequest();

    if (!response.body?.user.token) {
      dispatch(logOutActionCreator());
      return;
    }

    const { token: authToken } = response.body.user;

    if (isLogging) {
      setIsLogging(false);
      const { email, role } = decodeToken(authToken);

      dispatch(
        logInActionCreator({
          email,
          authToken,
          role,
        })
      );

      setToken(authToken);

      return;
    }

    dispatch(setRefreshTokenActionCreator(authToken));
  }, [dispatch, isLogging]);
};

export default useRefreshToken;
