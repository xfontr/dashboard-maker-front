import useQuery from "../../../common/hooks/useQuery";
import { api } from "../../../common/services/RequestHandler";
import ENDPOINTS from "../../../config/endpoints";
import { useUserAuthMiddlewares } from "../store/userAuthSlice/userAuth.hook";

const logOutRequest = () =>
  api.patch(ENDPOINTS.users.logOut, undefined, { withCredentials: true });

/**
 * @example
 *   const logOut = useLogOut();
 *   logOut();
 *
 * @returns A function that when called, will require the API to log the user
 *   out (which will mean to delete its authentication token) and also delete
 *   the user from the store.
 */
const useLogOut = () => {
  const { logUserOut } = useUserAuthMiddlewares();

  return useQuery({
    onInit: logUserOut,
  })(logOutRequest);
};

export default useLogOut;
