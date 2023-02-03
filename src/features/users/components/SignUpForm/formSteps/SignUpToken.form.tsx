import Button from "../../../../../common/components/Button/Button";
import Form from "../../../../../common/components/Form/Form";
import useForm from "../../../../../common/hooks/useForm";
import { IToken, ProtoToken } from "../../../types/token.types";
import schema from "../schemas/token.schema";

type ValidateTokenProps = {
  handleSubmit: (values: IToken) => Promise<void>;
};

const SignUpTokenForm = ({ handleSubmit }: ValidateTokenProps): JSX.Element => {
  const formHandler = useForm<ProtoToken>(schema, handleSubmit);

  return (
    <Form {...{ formHandler }}>
      <div className="form__buttons">
        <Button>Verify token</Button>
      </div>
    </Form>
  );
};

export default SignUpTokenForm;
