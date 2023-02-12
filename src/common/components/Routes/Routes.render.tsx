import { Navigate } from "react-router-dom";
import NotFoundPage from "../../pages/NotFound.page";
import DashboardLayout, {
  DashboardLayoutProps,
} from "../../../features/menu/components/DashboardLayout/DashboardLayout";

type RoutesRenderProps = {
  to?: string;
  Element?: React.LazyExoticComponent<() => JSX.Element> | (() => JSX.Element);
  Layout?: (props: DashboardLayoutProps) => JSX.Element;
  layoutProps?: Omit<DashboardLayoutProps, "children">;
};

const RoutesRender = ({
  to,
  Element,
  Layout = DashboardLayout,
  layoutProps,
}: RoutesRenderProps): JSX.Element => {
  if (!Element && !to) {
    return <NotFoundPage />;
  }

  return (
    <>
      {Element ? (
        <Layout {...layoutProps}>
          <Element />
        </Layout>
      ) : (
        <>{!Element && <Navigate to={to!} />}</>
      )}
    </>
  );
};

export default RoutesRender;
