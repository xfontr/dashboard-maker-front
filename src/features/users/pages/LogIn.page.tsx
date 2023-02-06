import Page, { PageProps } from "../../../common/components/Page/Page";
import LogInForm from "../components/LogInForm/LogIn.form";

export const logInHeading: Omit<PageProps, "children"> = {
  heading: "Log in",
  subheading: "Access your private dashboard with your email and password.",
};

const LogInPage = (): JSX.Element => (
  <Page {...logInHeading}>
    <LogInForm />
  </Page>
);

export default LogInPage;
