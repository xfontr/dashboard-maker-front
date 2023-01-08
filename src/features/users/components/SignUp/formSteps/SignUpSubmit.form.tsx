import { useState } from "react";
import Button from "../../../../../common/components/Button/Button";
import Form from "../../../../../common/components/Form/Form";
import signUpLocationSchema from "../schemas/location.schema";
import { ProtoUser } from "../../../types/user.types";

type SignUpSubmitProps = {
  values: Partial<ProtoUser>;
  handleSubmit: (
    submit: boolean
  ) => (values: Record<string, string>) => Promise<void>;
};

const SignUpSubmitForm = ({
  handleSubmit,
  values,
}: SignUpSubmitProps): JSX.Element => {
  const [shouldSubmit, setSubmit] = useState<boolean>(false);

  return (
    <Form
      schema={signUpLocationSchema(values)}
      actionWithValues={handleSubmit(shouldSubmit)}
    >
      <Button onClick={() => setSubmit(false)} typeof="button">
        Step back
      </Button>
      <Button onClick={() => setSubmit(true)}>Sign up</Button>
    </Form>
  );
};

export default SignUpSubmitForm;
