import { useUiMiddlewares } from "../store/slices/ui";
import { QueryOptions } from "../types/IQuery";
import IResponse from "../types/IResponse";
import callFunctionIfExists from "../utils/callFunctionIfExists";

// TODO: Since now there is a default status 200 condition, test it

/**
 * Takes a custom object of options that defines the UI behavior and forces an
 * error if the response doesn't match a specific status
 *
 * It returns a function that receives a callback, which is the one that will be
 * doing the request. This function also returns another one, which is the one
 * that contains the main logic and receives values in case they are needed
 *
 * The options can include init, success and error actions to be performed
 *
 * @example
 *   const logIn = useQuery<CodedToken, UserLogInData>({
 *   onSuccess: (response, passedValues) => {},
 *   onError: (response) => {},
 *   onInit: () => {},
 *   options: {
 *   successCondition: ["status", 200],
 *   loading: "Loading...",
 *   error: "Something went wrong",
 *   // success: "" --> If not specified, it will not launch the UI that matches the status
 *   },
 *   });
 *
 *   // The callback in the curried function receives the input of data
 *   const logInPetition = logIn((passedValues) => api.post(passedValues))
 *
 *   // And this is the final actual request:
 *   logInPetition({ email: test@test.com })
 */

const useQuery = <T = unknown, L = unknown>(options: QueryOptions<T, L>) => {
  const fullOptions: QueryOptions<T, L>["options"] = {
    successCondition: ["status", 200],
    ...options.options,
  };

  const { showLoadingUi, showErrorUi, showSuccessUi } =
    useUiMiddlewares<IResponse<T>>(fullOptions);

  const init = () => {
    showLoadingUi();
    callFunctionIfExists(options.onInit);
  };

  /**
   * @example
   *   const example = useQuery(...args);
   *
   *   const finalCall = example((passedValues) => api.post(passedValues));
   *
   *   finalCall(passedValues); // Here's where the passedValues come from
   *
   * @param callback (passedValues: object) => Promise<response>
   *
   *   Function returned by the useQuery hook that takes a callback function as a
   *   parameter, which will be called by said hook and receive the values
   *   passed by the user
   */

  return (callback: (values?: L) => Promise<IResponse<T>>) =>
    /**
     * Last function returned by the useQuery hook. Takes optional values that
     * will be added to the request of the previous callback. Once called, it
     * calls the callback and then does the success/error actions depending on
     * the outcome
     */
    async (values?: L): Promise<IResponse<T>> => {
      init();

      const response = await callback(values);

      const success = async (): Promise<unknown | undefined> => {
        showSuccessUi();

        return callFunctionIfExists(options.onSuccess, response, values);
      };

      const error = (): unknown | undefined => {
        showErrorUi();
        return callFunctionIfExists(options.onError, response);
      };

      const verifyCondition = async (): Promise<IResponse<T>> => {
        const [status, successStatus] = fullOptions.successCondition!;

        if (response[status] === successStatus) {
          return (await success()) ?? response;
        }

        return error() ?? response;
      };

      return verifyCondition();
    };
};

export default useQuery;
