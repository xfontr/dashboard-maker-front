import Button from "../../../common/components/Button/Button";
import Form from "../../../common/components/Form/Form";
import tokenSchema from "../schemas/token.schema";
import { api } from "../../../common/services/RequestHandler";
import ENDPOINTS from "../../../config/endpoints";
import { useState } from "react";

type IToken = {
  email: string;
};

const SignUpPage = (): JSX.Element => {
  const [isTokenOk, setTokenStatus] = useState<boolean>(false);

  const handleSubmit = async (values: Record<string, string>) => {
    const response = await api.postWithAuth<unknown, IToken>(
      ENDPOINTS.tokens.verify,
      {
        email: values.email,
      },
      values.token
    );

    setTokenStatus(response.status === 200);
  };

  return (
    <>
      <Form schema={tokenSchema} actionWithValues={handleSubmit}>
        <Button>Verify token</Button>
      </Form>
      {isTokenOk ? <>Valid token</> : <>Invalid token</>}
    </>
  );
};

export default SignUpPage;
