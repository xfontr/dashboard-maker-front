import useQuery from "../../../common/hooks/useQuery";
import { api } from "../../../common/services/RequestHandler";
import ENDPOINTS from "../../../config/endpoints";
import { logOutActionCreator } from "../store";
import useUserAuth from "../store/userAuth.hook";

const logOutRequest = () =>
  api.patch(ENDPOINTS.users.logOut, undefined, { withCredentials: true });

const useLogOut = (refresh?: Function) => {
  const { dispatch } = useUserAuth();

  return useQuery({
    onSuccess: async () => {
      dispatch(logOutActionCreator());
      refresh && refresh();
    },
    options: { successCondition: ["status", 200] },
  })(logOutRequest);
};

export default useLogOut;
