import { render, screen } from "@testing-library/react";
import SignUpPage, { signUpHeading } from "../SignUp.page";

describe("Given a SignUpPage component", () => {
  describe("When instantiated", () => {
    test("Then it should show a sign up form and the page heading and subheading", () => {
      render(<SignUpPage />);

      const view = [
        screen.getByRole("heading", { name: signUpHeading.heading }),
        screen.getByText(signUpHeading.subheading!),
        screen.getByRole("button", { name: "Verify token" }),
      ];

      view.forEach((node) => expect(node).toBeInTheDocument());
    });
  });
});
