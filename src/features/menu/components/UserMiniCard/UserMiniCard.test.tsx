import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useEffect } from "react";
import { render } from "../../../../common/test-utils/customRender";
import { mockUser } from "../../../../common/test-utils/mocks";
import { logInActionCreator } from "../../../users/store";
import useUserAuth from "../../../users/store/userAuth.hook";
import UserMiniCard from "./UserMiniCard";

const MockComponent = (): JSX.Element => {
  const {
    dispatch,
    userAuth: { isLogged },
  } = useUserAuth();

  useEffect(() => {
    dispatch(logInActionCreator(mockUser));
  }, [dispatch]);

  return (
    <>
      {isLogged && <>User is logged</>}
      <UserMiniCard
        identifier={mockUser.name!}
        role={mockUser.role!}
        showOnlyIcon={false}
      />
    </>
  );
};

describe("Given a UserMiniCard component", () => {
  describe("When instantiated in full size with a role 'User' and a identifier 'John'", () => {
    test("Then it should render the passed user data", () => {
      const defaultImageSource =
        "http://localhost/img/default-user-profile.png";

      render(
        <UserMiniCard
          identifier={mockUser.name!}
          role={mockUser.role!}
          showOnlyIcon={false}
        />
      );

      const view = [
        screen.getByRole("heading", { name: "User name" }),
        screen.getByText(mockUser.role!),
        screen.getByAltText("User profile"),
        screen.getByRole("button", { name: "Log out" }),
        screen.getByRole("button", { name: "Settings" }),
      ];

      view.forEach((node) => expect(node).toBeInTheDocument());

      expect(view[0].textContent).toBe(mockUser.name);
      expect((view[2] as HTMLImageElement).src).toBe(defaultImageSource);
    });
  });

  describe("When instantiated with all the required data but not in full size", () => {
    test("Then it should display only the user picture", () => {
      render(
        <UserMiniCard
          identifier={mockUser.name!}
          role={mockUser.role!}
          showOnlyIcon={true}
        />
      );

      const hiddenView = [
        screen.queryByRole("heading", { name: "User name" }),
        screen.queryByText(mockUser.role!),
        screen.queryByRole("button", { name: "Log out" }),
        screen.queryByRole("button", { name: "Settings" }),
      ];

      const view = screen.getByAltText("User profile");

      expect(view).toBeInTheDocument();
      hiddenView.forEach((node) => expect(node).not.toBeInTheDocument());
    });
  });

  describe("When instantiated in full size and clicked the log out button", () => {
    test("Then it should log the user out", async () => {
      render(<MockComponent />);

      const userIsLoggedMessage = screen.getByText("User is logged");

      expect(userIsLoggedMessage).toBeInTheDocument();

      const logOutButton = screen.getByRole("button", { name: "Log out" });
      await userEvent.click(logOutButton);

      const hiddenUserIsLoggedMessage = screen.queryByText("User is logged");

      expect(hiddenUserIsLoggedMessage).not.toBeInTheDocument();
    });
  });
});
