import Page, { PageProps } from "../../../common/components/Page/Page";
import LogInForm from "../components/LogInForm/LogIn.form";

const headingInfo: Omit<PageProps, "children"> = {
  heading: "Log in",
  subheading: "Access your private dashboard with your email and password.",
};

const LogInPage = (): JSX.Element => (
  <Page {...headingInfo}>
    <LogInForm />
  </Page>
);

export default LogInPage;
