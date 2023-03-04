import useQuery from "../../../common/hooks/useQuery";
import useUser from "../../../common/hooks/useUser";
import { api } from "../../../common/services/RequestHandler";
import ENDPOINTS from "../../../config/endpoints";

const logOutRequest = () =>
  api.patch(ENDPOINTS.users.logOut, undefined, { withCredentials: true });

const useLogOut = () => {
  const { logOut } = useUser();

  return useQuery({
    onInit: logOut,
  })(logOutRequest);
};

export default useLogOut;
