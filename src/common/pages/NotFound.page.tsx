import { Link } from "react-router-dom";
import PATHS from "../../config/paths";
import Page, { PageProps } from "../components/Page/Page";

export const notFoundHeading: Omit<PageProps, "children"> = {
  heading: "We couldn't find what you were looking for (404)",
  subheading: "Maybe try better luck at the home page?",
};

const NotFoundPage = (): JSX.Element => (
  <Page {...notFoundHeading}>
    <Link to={PATHS.root}>Home</Link>
  </Page>
);

export default NotFoundPage;
