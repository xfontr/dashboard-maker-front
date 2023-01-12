import { useState } from "react";
import useSteps from "../../../common/hooks/useSteps";
import { api } from "../../../common/services/RequestHandler";
import UserRoles from "../../../common/types/UserRoles";
import { MAIN_IDENTIFIER } from "../../../config/database";
import ENDPOINTS from "../../../config/endpoints";
import { IToken, ProtoToken, TokenResponse } from "../types/token.types";
import IUser, { ProtoUser } from "../types/user.types";
import joinValues from "../utils/joinValues";

const useRegistration = (next: ReturnType<typeof useSteps>["next"]) => {
  const [token, setToken] = useState<IToken>();
  const [user, setUser] = useState<ProtoUser>();

  const handleTokenSubmit = async (values: Record<string, string>) => {
    const protoToken = { ...values } as unknown as ProtoToken;

    const response = await api.postWithAuth<
      TokenResponse,
      Omit<ProtoToken, "code">
    >(
      ENDPOINTS.tokens.verify,
      {
        [MAIN_IDENTIFIER]: protoToken[MAIN_IDENTIFIER],
      },
      protoToken.code
    );

    if (response.status !== 200) return;

    setToken({ ...response.body!.token, code: protoToken.code });
    setUser((currentState) => ({
      ...currentState!,
      [MAIN_IDENTIFIER]: protoToken[MAIN_IDENTIFIER],
    }));

    next();
  };

  const handlePasswordSubmit = (values: Record<string, string>) => {
    setUser(joinValues<ProtoUser>(values));
    next();
  };

  const handleSignUpSubmit = (
    (role: UserRoles, tokenCode: string) =>
    async (values: Record<string, string>) => {
      setUser(joinValues<ProtoUser>(values));

      const userToRequest = { ...user!, role };
      delete userToRequest.repeatPassword;

      const response = await api.postWithAuth<unknown, IUser>(
        ENDPOINTS.users.signUp,
        userToRequest,
        tokenCode
      );

      if (response.status !== 201) return;

      next();
    }
  )(token?.role ?? "user", token?.code ?? "");

  return {
    user,
    setUser,
    token,
    handleTokenSubmit,
    handleSignUpSubmit,
    handlePasswordSubmit,
  };
};

export default useRegistration;
