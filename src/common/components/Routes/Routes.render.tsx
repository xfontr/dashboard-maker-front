import { PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";

type RoutesRenderProps = {
  to?: string;
  Element?: React.LazyExoticComponent<() => JSX.Element> | (() => JSX.Element);
  Layout?: ({ children }: PropsWithChildren) => JSX.Element;
};

const RoutesRender = ({
  to,
  Element,
  Layout,
}: RoutesRenderProps): JSX.Element => (
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

export default RoutesRender;
