import { useEffect, useState } from "react";
import { api } from "../../../common/services/RequestHandler";
import ENDPOINTS from "../../../config/endpoints";
import { logInActionCreator, setRefreshTokenActionCreator } from "../store";
import useUserAuth from "../store/userAuth.hook";
import { CodedToken } from "../types/token.types";
import decodeToken from "../utils/decodeToken";

const refreshTokenRequest = async () =>
  await api.get<CodedToken>(ENDPOINTS.users.refreshToken, {
    withCredentials: true,
  });

const useRefreshToken = () => {
  const { dispatch, userAuth } = useUserAuth();
  const [isLogging, setIsLogging] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      if ((!isLogging && !userAuth.isLogged) || userAuth.isLogged) return;

      const { body: refreshToken } = await refreshTokenRequest();

      if (isLogging) {
        const { email, role } = decodeToken(refreshToken?.user.token!);

        dispatch(
          logInActionCreator({
            email,
            authToken: refreshToken?.user.token!,
            role,
          })
        );

        setIsLogging(false);
        return;
      }

      dispatch(setRefreshTokenActionCreator(refreshToken?.user.token));
    })();
  }, [isLogging, userAuth.isLogged, dispatch]);

  const forceRefresh = () => {
    setIsLogging(true);
  };

  return {
    forceRefresh,
  };
};

export default useRefreshToken;
