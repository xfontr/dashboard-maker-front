import Button from "../../../../../common/components/Button/Button";
import Form from "../../../../../common/components/Form/Form";
import { ProtoUser } from "../../../types/user.types";
import SignUpPasswordSchema from "../schemas/password.schema";

type SignUpFormProps = {
  values: Partial<ProtoUser>;
  handleSubmit: (values: Record<string, string>) => void;
};

const SignUpPasswordForm = ({
  values,
  handleSubmit,
}: SignUpFormProps): JSX.Element => (
  <Form schema={SignUpPasswordSchema(values)} actionWithValues={handleSubmit}>
    <Button>Last details</Button>
    <span>You're almost there!</span>
  </Form>
);

export default SignUpPasswordForm;
