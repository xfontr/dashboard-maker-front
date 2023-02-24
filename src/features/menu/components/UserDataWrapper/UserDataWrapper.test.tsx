import { screen } from "@testing-library/react";
import { useEffect } from "react";
import { render } from "../../../../common/test-utils/customRender";
import { mockUser } from "../../../../common/test-utils/mocks";
import useUserData from "../../../users/store/userDataSlice/userData.hook";
import { setDataActionCreator } from "../../../users/store/userDataSlice/userData.slice";
import UserDataWrapper from "./UserDataWrapper";

const MockComponentWithLoggedUser = () => {
  const { dispatch } = useUserData();

  useEffect(() => {
    dispatch(setDataActionCreator(mockUser));
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
