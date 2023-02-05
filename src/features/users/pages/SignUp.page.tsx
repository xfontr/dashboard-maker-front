import Page, { PageProps } from "../../../common/components/Page/Page";
import SignUpForm from "../components/SignUpForm/SignUpForm";

const headingInfo: Omit<PageProps, "children"> = {
  heading: "Sign up",
  subheading:
    "Use the access data provided by the administrator and follow the steps to sign up.",
};

const SignUpPage = (): JSX.Element => (
  <Page {...headingInfo}>
    <SignUpForm />
  </Page>
);

export default SignUpPage;
