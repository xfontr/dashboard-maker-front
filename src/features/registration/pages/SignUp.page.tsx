import Button from "../../../common/components/Button/Button";
import Form from "../../../common/components/Form/Form";
import tokenSchema from "../schemas/token.schema";

const SignUpPage = (): JSX.Element => {
  return (
    <Form schema={tokenSchema}>
      <Button>Verify token</Button>
    </Form>
  );
};

export default SignUpPage;
