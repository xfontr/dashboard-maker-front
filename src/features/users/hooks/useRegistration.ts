import { useState } from "react";
import useSteps from "../../../common/hooks/useSteps";
import { api } from "../../../common/services/RequestHandler";
import UserRoles from "../../../common/types/UserRoles";
import { MAIN_IDENTIFIER } from "../../../config/database";
import ENDPOINTS from "../../../config/endpoints";
import { IToken, ProtoToken, TokenResponse } from "../types/token.types";
import { ProtoUser } from "../types/user.types";
import joinValues from "../utils/joinValues";
import { SIGN_USER_UP_UI, VERIFY_TOKEN_UI } from "../config/ui.constants";
import useQuery from "../../../common/hooks/useQuery";

const { tokens, users } = ENDPOINTS;

const useRegistration = (next: ReturnType<typeof useSteps>["next"]) => {
  const [token, setToken] = useState<IToken>();
  const [user, setUser] = useState<ProtoUser>();

  const tokenQuery = useQuery<TokenResponse, ProtoToken>({
    onSuccess: (response, values) => {
      setToken({ ...response.body!.token, code: values!.code });
      setUser((currentState) => ({
        ...currentState!,
        [MAIN_IDENTIFIER]: values![MAIN_IDENTIFIER],
      }));
      next();
    },
    options: VERIFY_TOKEN_UI,
  });

  const handleTokenSubmit = async (values: ProtoToken) => {
    await tokenQuery((tokenData) =>
      api.postWithAuth(
        tokens.verify,
        {
          [MAIN_IDENTIFIER]: tokenData![MAIN_IDENTIFIER],
        },
        tokenData!.code
      )
    )(values);
  };

  const handlePasswordSubmit = (values: Partial<ProtoUser>) => {
    setUser(joinValues<ProtoUser>(values));
    next();
  };

  const userQuery = useQuery<unknown, Partial<ProtoUser>>({
    onSuccess: next,
    options: SIGN_USER_UP_UI,
  });

  const handleSignUpSubmit = (
    (role: UserRoles, tokenCode: string) =>
    async (values: Partial<ProtoUser>) => {
      const fullUser = joinValues<ProtoUser>(values)(user);

      setUser(fullUser);

      const userToRequest = { ...fullUser, role };
      delete userToRequest.repeatPassword;

      await userQuery((userToRequest) =>
        api.postWithAuth(users.signUp, userToRequest, tokenCode)
      )(values);
    }
  )(token?.role ?? "user", token?.code ?? "");

  return {
    token,
    user,
    setUser,
    handleTokenSubmit,
    handleSignUpSubmit,
    handlePasswordSubmit,
  };
};

export default useRegistration;
