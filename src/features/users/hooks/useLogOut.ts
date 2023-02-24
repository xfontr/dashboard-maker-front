import useQuery from "../../../common/hooks/useQuery";
import useUser from "../../../common/hooks/useUser";
import { api } from "../../../common/services/RequestHandler";
import ENDPOINTS from "../../../config/endpoints";

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
  const { logOut } = useUser();

  return useQuery({
    onInit: logOut,
  })(logOutRequest);
};

export default useLogOut;
