import useQuery from "../../../common/hooks/useQuery";
import { api } from "../../../common/services/RequestHandler";
import ENDPOINTS from "../../../config/endpoints";
import { logOutActionCreator } from "../store";
import useUserAuth from "../store/userAuth.hook";

const logOutRequest = () =>
  api.patch(ENDPOINTS.users.logOut, undefined, { withCredentials: true });

/**
 * @param callback Expected usage: to activate side effects that are related to
 *   the log out action. For example, a tokenRefresh function that will require
 *   the API to delete the database token
 */

const useLogOut = (callback?: Function) => {
  const { dispatch } = useUserAuth();

  return useQuery({
    onSuccess: async () => {
      dispatch(logOutActionCreator());
      callback && callback();
    },
    options: { successCondition: ["status", 200] },
  })(logOutRequest);
};

export default useLogOut;
