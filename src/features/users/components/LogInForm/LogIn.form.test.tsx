import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { render } from "../../../../common/test-utils/customRender";
import { mockUser } from "../../../../common/test-utils/mocks";
import { MOCK_FORCE_ERROR } from "../../../../common/test-utils/mockServer/mockHandlers";
import { multiType } from "../../../../common/test-utils/test.utils";
import ENDPOINTS from "../../../../config/endpoints";
import useUserAuth from "../../store/userAuthSlice/userAuth.hook";
import LogInForm from "./LogIn.form";
import logInSchema from "./LogIn.schema";

jest.mock("../../utils/decodeToken", () => () => mockUser);

const TestWrapper = () => {
  const {
    userAuth: { isLogged },
  } = useUserAuth();

  return (
    <>
      <LogInForm />
      {isLogged ? <>User logged</> : <>User not logged</>}
    </>
  );
};

describe("Given a LogInForm form", () => {
  describe("When instantiated", () => {
    test("Then it should display the corresponding fields to said form", () => {
      render(<TestWrapper />);

      logInSchema.forEach(({ label }) => {
        const node = screen.getByLabelText(label);
        expect(node).toBeInTheDocument();
      });
    });
  });

  describe("When instantiated and completed with valid values", () => {
    test("Then it should log the user in", async () => {
      render(<TestWrapper />);

      const submitButton = screen.getByRole("button", { name: "Log in" });

      screen.getByText("User not logged");

      await multiType(
        logInSchema.map(({ label }) => screen.getByLabelText(label)),
        "email@email.com"
      );

      await userEvent.click(submitButton);

      const logged = await screen.findByText("User logged");

      expect(logged).toBeInTheDocument();
    });
  });

  describe("When instantiated and completed, but the login fails", () => {
    test("Then it should not log the user in", async () => {
      ENDPOINTS.users.logIn = MOCK_FORCE_ERROR;

      render(<TestWrapper />);

      const submitButton = screen.getByRole("button", { name: "Log in" });

      screen.getByText("User not logged");

      await multiType(
        logInSchema.map(({ label }) => screen.getByLabelText(label)),
        "email@email.com"
      );

      await userEvent.click(submitButton);

      const notLogged = await screen.findByText("User not logged");

      expect(notLogged).toBeInTheDocument();
    });
  });
});
