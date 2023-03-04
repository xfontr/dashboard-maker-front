import Button from "../../../../common/components/Button/Button";
import Form from "../../../../common/components/Form/Form";
import useForm from "../../../../common/hooks/useForm";
import useLogIn from "../../hooks/useLogIn";
import { UserLogInData } from "../../types/user.types";
import logInSchema from "./LogIn.schema";

const LogInForm = (): JSX.Element => {
  const formHandler = useForm<UserLogInData>(logInSchema, useLogIn().logIn);

  return (
    <Form {...{ formHandler }}>
      <div className="form__buttons">
        <Button>Log in</Button>
      </div>
    </Form>
  );
};

export default LogInForm;
