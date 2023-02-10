import { render, screen } from "@testing-library/react";
import LogInPage, { logInHeading } from "../LogIn.page";

describe("Given a LogInPage component", () => {
  describe("When instantiated", () => {
    test("Then it should show a log in form and the page heading and subheading", () => {
      render(<LogInPage />);

      const view = [
        screen.getByRole("heading", { name: logInHeading.heading }),
        screen.getByText(logInHeading.subheading!),
        screen.getByRole("button", { name: "Log in" }),
      ];

      view.forEach((node) => expect(node).toBeInTheDocument());
    });
  });
});
