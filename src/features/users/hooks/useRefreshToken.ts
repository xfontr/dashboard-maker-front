import { useCallback, useState } from "react";
import { api } from "../../../common/services/RequestHandler";
import ENDPOINTS from "../../../config/endpoints";
import {
  logInActionCreator,
  logOutActionCreator,
  setRefreshTokenActionCreator,
} from "../store";
import useUserAuth from "../store/userAuth.hook";
import { CodedToken } from "../types/token.types";
import decodeToken from "../utils/decodeToken";

/**
 * If the request fails, it will be handled by the api service, with no side
 * effects required. This function is meant to run in the background so we don't
 * want UI changes
 */
const refreshTokenRequest = async () =>
  await api.get<CodedToken>(ENDPOINTS.users.refreshToken, {
    withCredentials: true,
  });

/**
 * @returns A function that when called for first time ever will request the API
 *   if there is a user with the token (using credentials, so no need to send
 *   the token explicitly).
 *
 *   If the user exists and the token is valid, it logs the user in. If there is
 *   no token, it does nothing and to make sure it logs out the user. If there
 *   is token and the user is logged in, it simply refreshes the token with a
 *   newer one.
 *
 *   Expected usage: Call this function when starting the app and every time it is
 *   needed to perform a request with token (unless necessary, as in Log out or
 *   Log in)
 */

const useRefreshToken = () => {
  const { dispatch } = useUserAuth();
  const [isLogging, setIsLogging] = useState<boolean>(true);

  return useCallback(async () => {
    const response = await refreshTokenRequest();

    if (!response.body?.user.token) {
      dispatch(logOutActionCreator());
      return;
    }

    const { token: authToken } = response.body.user;

    if (isLogging) {
      const { email, role } = decodeToken(authToken);

      dispatch(
        logInActionCreator({
          email,
          authToken,
          role,
        })
      );

      setIsLogging(false);
      return;
    }

    dispatch(setRefreshTokenActionCreator(authToken));
  }, [dispatch, isLogging]);
};

export default useRefreshToken;
