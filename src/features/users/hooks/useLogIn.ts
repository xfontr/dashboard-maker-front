import { api } from "../../../common/services/RequestHandler";
import { LOG_IN_UI } from "../config/ui.constants";
import ENDPOINTS from "../../../config/endpoints";
import IUser, { UserLogInData } from "../types/user.types";
import decodeToken from "../utils/decodeToken";
import { CodedToken } from "../types/token.types";
import useQuery from "../../../common/hooks/useQuery";
import { logInActionCreator } from "../store/userAuthSlice/userAuth.slice";
import useUserAuth from "../store/userAuthSlice/userAuth.hook";
import useUserData from "../store/userDataSlice/userData.hook";
import { setDataActionCreator } from "../store/userDataSlice/userData.slice";
import useLogOut from "./useLogOut";

const requestLogIn = (userLogInData?: UserLogInData) =>
  api.post<CodedToken, UserLogInData>(ENDPOINTS.users.logIn, userLogInData!, {
    withCredentials: true,
  });

const requestUserData = (token: string) =>
  api.getWithAuth<{ user: Omit<IUser, "password"> }>(ENDPOINTS.users.profile, token, {
    withCredentials: true,
  });

const useLogIn = () => {
  const { dispatch } = useUserAuth();
  const { dispatch: dispatchData } = useUserData();
  const logOut = useLogOut()

  const setUserData = useQuery<{ user: Omit<IUser, "password"> }, IUser>({
    onSuccess: async (data) => {
      dispatchData(setDataActionCreator(data.body!.user));
    },
    onError: logOut,
    options: { ...LOG_IN_UI, loading: undefined },
  });

  return useQuery<CodedToken, UserLogInData>({
    onSuccess: async (data) => {
      const { email, role } = decodeToken(data.body!.user.token);

      dispatch(
        logInActionCreator({
          email,
          authToken: data.body!.user.token,
          role,
        })
      );

      setUserData(() => requestUserData(data.body!.user.token))();
    },
    options: LOG_IN_UI,
  })(requestLogIn);
};

export default useLogIn;
