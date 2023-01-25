import { useEffect, useState } from "react";
import { api } from "../../../common/services/RequestHandler";
import ENDPOINTS from "../../../config/endpoints";
import { logInActionCreator, setRefreshTokenActionCreator } from "../store";
import useUserAuth from "../store/userAuth.hook";
import { CodedToken } from "../types/token.types";
import decodeToken from "../utils/decodeToken";

const useRefreshToken = () => {
  const { dispatch, userAuth } = useUserAuth();
  const [isLogging, setIsLogging] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      if ((!isLogging && !userAuth.isLogged) || userAuth.isLogged) return;

      const { body: refreshToken } = await api.get<CodedToken>(
        ENDPOINTS.users.refreshToken,
        { withCredentials: true }
      );

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
  }, [dispatch, isLogging, userAuth.isLogged]);
};

export default useRefreshToken;
