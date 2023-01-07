import { PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";
import NotFoundPage from "../../pages/NotFound.page";

type RoutesRenderProps = {
  to?: string;
  Element?: React.LazyExoticComponent<() => JSX.Element> | (() => JSX.Element);
  Layout?: ({ children }: PropsWithChildren) => JSX.Element;
};

const RoutesRender = ({
  to,
  Element,
  Layout,
}: RoutesRenderProps): JSX.Element => {
  if (!Element && !to) {
    return <NotFoundPage />;
  }

  return (
    <>
      {Element && Layout ? (
        <Layout>
          <Element />
        </Layout>
      ) : (
        <>
          {Element && <Element />}
          {!Element && <Navigate to={to!} />}
        </>
      )}
    </>
  );
};

export default RoutesRender;