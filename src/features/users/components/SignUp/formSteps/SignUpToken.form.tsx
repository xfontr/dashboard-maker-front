import Button from "../../../../../common/components/Button/Button";
import Form from "../../../../../common/components/Form/Form";
import schema from "../schemas/token.schema";

type ValidateTokenProps = {
  handleSubmit: (values: Record<string, string>) => Promise<void>;
};

const SignUpTokenForm = ({ handleSubmit }: ValidateTokenProps): JSX.Element => (
  <Form {...{ schema }} actionWithValues={handleSubmit}>
    <Button>Verify token</Button>
  </Form>
);

export default SignUpTokenForm;
