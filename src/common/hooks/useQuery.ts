import { useUiMiddlewares } from "../store/slices/ui";
import { QueryOptions } from "../types/IQuery";
import IResponse from "../types/IResponse";
import callFunctionIfExists from "../utils/callFunctionIfExists";

// TODO: Document all of this very carefully once completely finished

// TODO: Test all the side effects ecosystem

const useQuery = <T, L>(options: QueryOptions<T, L>) => {
  const { showLoadingUi, showErrorUi, showSuccessUi } = useUiMiddlewares<
    IResponse<T>
  >(options.options);

  const init = () => {
    showLoadingUi();
    callFunctionIfExists(options.onInit);
  };

  return (callback: (values?: L) => Promise<IResponse<T>>) =>
    async (values?: L): Promise<unknown | IResponse<T>> => {
      init();

      const response = await callback(values);

      const success = (): unknown | undefined => {
        showSuccessUi();
        return callFunctionIfExists(options.onSuccess, response, values);
      };

      const error = (): unknown | undefined => {
        showErrorUi();
        return callFunctionIfExists(options.onError, response);
      };

      const verifyCondition = (): unknown => {
        const {
          successCondition: [status, successStatus],
        } = options.options;

        if (response[status] === successStatus) {
          return success() ?? response;
        }

        return error() ?? response;
      };

      return verifyCondition();
    };
};

export default useQuery;
