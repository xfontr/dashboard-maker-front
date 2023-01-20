import { useState } from "react";
import useSteps from "../../../common/hooks/useSteps";
import { api } from "../../../common/services/RequestHandler";
import useUi from "../../../common/store/slices/ui/ui.hook";
import UserRoles from "../../../common/types/UserRoles";
import { MAIN_IDENTIFIER } from "../../../config/database";
import ENDPOINTS from "../../../config/endpoints";
import { IToken, ProtoToken, TokenResponse } from "../types/token.types";
import IUser, { ProtoUser } from "../types/user.types";
import joinValues from "../utils/joinValues";
import {
  SIGN_UP_SIDE_EFFECTS,
  TOKEN_SIDE_EFFECTS,
} from "./useRegistration.constants";

const useRegistration = (next: ReturnType<typeof useSteps>["next"]) => {
  const { handleSideEffects } = useUi();
  const [token, setToken] = useState<IToken>();
  const [user, setUser] = useState<ProtoUser>();

  const handleTokenSubmit = async (
    values: Record<string, string>
  ): Promise<void> => {
    const protoToken = { ...values } as unknown as ProtoToken;

    const post = handleSideEffects<TokenResponse>(TOKEN_SIDE_EFFECTS);

    const ifSuccess = await post(() =>
      api.postWithAuth<TokenResponse, Omit<ProtoToken, "code">>(
        ENDPOINTS.tokens.verify,
        {
          [MAIN_IDENTIFIER]: protoToken[MAIN_IDENTIFIER],
        },
        protoToken.code
      )
    );

    ifSuccess((response) => {
      setToken({ ...response.body!.token, code: protoToken.code });
      setUser((currentState) => ({
        ...currentState!,
        [MAIN_IDENTIFIER]: protoToken[MAIN_IDENTIFIER],
      }));
      next();
    });
  };

  const handlePasswordSubmit = (values: Record<string, string>) => {
    setUser(joinValues<ProtoUser>(values));
    next();
  };

  const handleSignUpSubmit = (
    (role: UserRoles, tokenCode: string) =>
    async (values: Record<string, string>) => {
      const fullUser = joinValues<ProtoUser>(values)(user);

      setUser(fullUser);

      const userToRequest = { ...fullUser, role };
      delete userToRequest.repeatPassword;

      const post = handleSideEffects(SIGN_UP_SIDE_EFFECTS);

      const ifSuccess = await post(() =>
        api.postWithAuth<unknown, IUser>(
          ENDPOINTS.users.signUp,
          userToRequest,
          tokenCode
        )
      );

      ifSuccess(next);
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
