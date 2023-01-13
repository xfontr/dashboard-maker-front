import Button from "../../../../../common/components/Button/Button";
import Form from "../../../../../common/components/Form/Form";
import useForm from "../../../../../common/hooks/useForm";
import { ProtoToken } from "../../../types/token.types";
import schema from "../schemas/token.schema";

type ValidateTokenProps = {
  handleSubmit: (values: Record<string, string>) => Promise<void>;
};

const SignUpTokenForm = ({ handleSubmit }: ValidateTokenProps): JSX.Element => {
  const formHandler = useForm<ProtoToken>(schema, handleSubmit);

  return (
    <Form {...{ formHandler }}>
      <Button>Verify token</Button>
    </Form>
  );
};

export default SignUpTokenForm;
