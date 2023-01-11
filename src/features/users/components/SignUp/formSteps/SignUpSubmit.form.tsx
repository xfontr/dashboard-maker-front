import Button from "../../../../../common/components/Button/Button";
import Form from "../../../../../common/components/Form/Form";
import signUpLocationSchema from "../schemas/location.schema";
import { ProtoUser } from "../../../types/user.types";
import useForm from "../../../../../common/hooks/useForm";

type SignUpSubmitProps = {
  values: Partial<ProtoUser>;
  setUser: React.Dispatch<React.SetStateAction<ProtoUser | undefined>>;
  previous: () => void;
  handleSubmit: (values: Record<string, string>) => Promise<void>;
};

const SignUpSubmitForm = ({
  handleSubmit,
  setUser,
  previous,
  values,
}: SignUpSubmitProps): JSX.Element => {
  const formHandler = useForm<ProtoUser>(
    signUpLocationSchema(values),
    handleSubmit
  );

  const stepBack = () => {
    setUser((currentState) => ({
      ...currentState,
      ...formHandler.values,
    }));
    previous();
  };

  return (
    <Form {...{ formHandler }}>
      <div className="form__buttons">
        <Button onClick={stepBack} type="button">
          Step back
        </Button>
        <Button>Sign up</Button>
      </div>
    </Form>
  );
};

export default SignUpSubmitForm;
