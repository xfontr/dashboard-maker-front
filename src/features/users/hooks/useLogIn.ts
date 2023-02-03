import { api } from "../../../common/services/RequestHandler";
import { LOG_IN_UI } from "../config/ui.constants";
import ENDPOINTS from "../../../config/endpoints";
import { UserLogInData } from "../types/user.types";
import decodeToken from "../utils/decodeToken";
import { CodedToken } from "../types/token.types";
import useQuery from "../../../common/hooks/useQuery";
import useUserAuth from "../store/userAuth.hook";
import { logInActionCreator } from "../store";

const requestLogIn = (userLogInData?: UserLogInData) =>
  api.post<CodedToken, UserLogInData>(ENDPOINTS.users.logIn, userLogInData!, {
    withCredentials: true,
  });

const useLogIn = () => {
  const { dispatch } = useUserAuth();

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
    },
    options: LOG_IN_UI,
  })(requestLogIn);
};

export default useLogIn;
