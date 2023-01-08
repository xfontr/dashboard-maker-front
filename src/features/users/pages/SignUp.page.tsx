import Button from "../../../common/components/Button/Button";
import Form from "../../../common/components/Form/Form";
import tokenSchema from "../schemas/token.schema";
import { api } from "../../../common/services/RequestHandler";
import ENDPOINTS from "../../../config/endpoints";
import { useState } from "react";
import signUpSchema from "../schemas/signUp.schema";
import { IS_TOKEN_REQUIRED, MAIN_IDENTIFIER } from "../../../config/database";
import { IToken, ProtoToken, TokenResponse } from "../types/token.types";
import IUser from "../types/user.types";
import UserRoles from "../../../common/types/UserRoles";

const SignUpPage = (): JSX.Element => {
  const [token, setToken] = useState<IToken>();

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

    setToken({ ...response.body!.token, code: protoToken.code });
  };

  const handleSignUpSubmit =
    (tokenCode: string, role: UserRoles) =>
    async (values: Record<string, string>) => {
      const { name, password, surname } = values as unknown as IUser;

      await api.postWithAuth<unknown, IUser>(
        ENDPOINTS.users.signUp,
        {
          [MAIN_IDENTIFIER]: values[MAIN_IDENTIFIER],
          name,
          password,
          surname,
          role,
        },
        tokenCode
      );
    };

  return (
    <>
      {token?.[MAIN_IDENTIFIER] && IS_TOKEN_REQUIRED ? (
        <Form
          schema={signUpSchema(token[MAIN_IDENTIFIER])}
          actionWithValues={handleSignUpSubmit(token.code, token.role)}
        >
          <Button>Sign up</Button>
        </Form>
      ) : (
        <>
          <Form schema={tokenSchema} actionWithValues={handleTokenSubmit}>
            <Button>Verify token</Button>
          </Form>
        </>
      )}
    </>
  );
};

export default SignUpPage;
