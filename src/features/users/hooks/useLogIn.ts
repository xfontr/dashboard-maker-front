import { api } from "../../../common/services/RequestHandler";
import { LOG_IN_UI } from "../config/ui.constants";
import ENDPOINTS from "../../../config/endpoints";
import { UserLogInData } from "../types/user.types";
import { useNavigate } from "react-router-dom";
import PATHS from "../../../config/paths";
import decodeToken from "../utils/decodeToken";
import { CodedToken } from "../types/token.types";
import { MAIN_IDENTIFIER } from "../../../config/database";
import useQuery from "../../../common/hooks/useQuery";

const useLogIn = () => {
  const navigate = useNavigate();

  return useQuery<CodedToken, UserLogInData>({
    onSuccess: (data) => {
      const decodedToken = decodeToken(data.body!.user.token);
      navigate(PATHS.home);
      console.log("Welcome ", decodedToken[MAIN_IDENTIFIER]);
    },
    options: LOG_IN_UI,
  })((userLogInData) => api.post(ENDPOINTS.users.logIn, userLogInData!));
};

export default useLogIn;
