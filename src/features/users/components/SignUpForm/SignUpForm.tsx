import useSteps from "../../../../common/hooks/useSteps";
import { IS_TOKEN_REQUIRED } from "../../../../config/database";
import useRegistration from "../../hooks/useRegistration";
import Steps from "../Steps/Steps";
import SignUpPasswordForm from "./formSteps/SignUpPassword.form";
import SignUpSubmitForm from "./formSteps/SignUpSubmit.form";
import SignUpTokenForm from "./formSteps/SignUpToken.form";
import "./SignUpForm.scss";

const SignUpForm = (): JSX.Element => {
  const { step, next, previous } = useSteps(!IS_TOKEN_REQUIRED ? 1 : 0);
  const {
    handleSignUpSubmit,
    handlePasswordSubmit,
    handleTokenSubmit,
    setUser,
    user,
  } = useRegistration(next);

  return (
    <section className="form-parent">
      <Steps currentStep={step} totalSteps={4} className="steps--form" />

      {step === 0 && <SignUpTokenForm handleSubmit={handleTokenSubmit} />}
      {step === 1 && (
        <SignUpPasswordForm values={user} handleSubmit={handlePasswordSubmit} />
      )}
      {step === 2 && (
        <SignUpSubmitForm
          values={user!}
          {...{ previous, setUser }}
          handleSubmit={handleSignUpSubmit}
        />
      )}
      {step === 3 && (
        <span>
          Thank you for signing up! You will shortly be redirected to your
          dashboard.
        </span>
      )}
    </section>
  );
};

export default SignUpForm;
