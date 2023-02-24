import { screen } from "@testing-library/react";
import { useEffect } from "react";
import { render } from "../../../../common/test-utils/customRender";
import { mockUser } from "../../../../common/test-utils/mocks";
import { logInActionCreator } from "../../../users/store";
import useUserAuth from "../../../users/store/userAuthSlice/userAuth.hook";
import UserDataWrapper from "./UserDataWrapper";

const MockComponentWithLoggedUser = () => {
  const { dispatch } = useUserAuth();

  useEffect(() => {
    dispatch(logInActionCreator(mockUser));
  }, [dispatch]);

  return <UserDataWrapper showOnlyIcon={false} />;
};

describe("Given a UserDataWrapper component", () => {
  describe("When instantiated", () => {
    test("Then it should render a user card component with the store data", () => {
      render(<MockComponentWithLoggedUser />);

      const userData = [
        screen.getByText(mockUser.email),
        screen.getByText(mockUser.role!),
      ];

      userData.forEach((node) => expect(node).toBeInTheDocument());
    });
  });
});
