import Page, { PageProps } from "../../../common/components/Page/Page";
import SignUpForm from "../components/SignUpForm/SignUpForm";

const headingInfo: Omit<PageProps, "children"> = {
  heading: "Sign up",
  subheading: "Sign up, please",
};

const SignUpPage = (): JSX.Element => (
  <Page {...headingInfo}>
    <SignUpForm />
  </Page>
);

export default SignUpPage;
