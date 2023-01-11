import Button from "../../../../../common/components/Button/Button";
import Form from "../../../../../common/components/Form/Form";
import useForm from "../../../../../common/hooks/useForm";
import { ProtoUser } from "../../../types/user.types";
import SignUpPasswordSchema from "../schemas/password.schema";

type SignUpFormProps = {
  values: Partial<ProtoUser>;
  handleSubmit: (values: Record<string, string>) => void;
};

const SignUpPasswordForm = ({
  values,
  handleSubmit,
}: SignUpFormProps): JSX.Element => {
  const formHandler = useForm<ProtoUser>(
    SignUpPasswordSchema(values),
    handleSubmit
  );

  return (
    <Form {...{ formHandler }}>
      <div className="form__buttons">
        <span>You're almost there!</span>
        <Button>Last details</Button>
      </div>
    </Form>
  );
};
export default SignUpPasswordForm;
