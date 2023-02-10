import { HTMLAttributes } from "react";
import { Link, useLocation } from "react-router-dom";
import PATHS from "../../../config/paths";
import setProps from "../../utils/setProps";
import "./Breadcrumbs.scss";

interface BreadcrumbsProps extends HTMLAttributes<HTMLDivElement> {}

const Breadcrumbs = ({ ...rest }: BreadcrumbsProps): JSX.Element => {
  const { pathname } = useLocation();
  const userPaths = pathname.split("/");
  userPaths.splice(0, 1);

  return (
    <div {...setProps(rest, "className", "breadcrumbs")}>
      <Link key={"home"} to={PATHS.root}>
        home
      </Link>

      {userPaths.map((path, index) =>
        index === userPaths.length - 1 ? (
          ` / ${path}`
        ) : (
          <Link key={path} to={`/${path}`}>
            {` / ${path}`}
          </Link>
        )
      )}
    </div>
  );
};

export default Breadcrumbs;
