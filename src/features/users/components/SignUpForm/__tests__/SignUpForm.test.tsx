import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { multiType } from "../../../../../common/test-utils/test.utils";
import signUpLocationSchema from "../schemas/location.schema";
import SignUpPasswordSchema from "../schemas/password.schema";
import signUpTokenSchema from "../schemas/token.schema";
import SignUpForm from "../SignUpForm";

const mockIsTokenRequiredGetter = jest.fn();

jest.mock("../../../../../config/database", () => ({
  ...jest.requireActual("../../../../../config/database"),
  get IS_TOKEN_REQUIRED() {
    return mockIsTokenRequiredGetter();
  },
}));

describe("Given a SignUpForm component", () => {
  describe("When instantiated and the token is required", () => {
    describe("If the user fills and submits correctly the three steps", () => {
      test("Then it should submit the form", async () => {
        mockIsTokenRequiredGetter.mockReturnValue(true);

        const typeText = "email@email.com";
        render(<SignUpForm />);

        // First step
        const firstStep = signUpTokenSchema.map<HTMLInputElement>(({ label }) =>
          screen.getByLabelText(label)
        );

        await multiType(firstStep, typeText);

        const firstSubmit = screen.getByRole("button", {
          name: "Verify token",
        });

        await userEvent.click(firstSubmit);

        // Second step
        const signUpSchema = SignUpPasswordSchema({});
        const secondStep = await Promise.all(
          signUpSchema.map<Promise<HTMLInputElement>>(({ label }) =>
            screen.findByLabelText(label)
          )
        );

        await multiType(secondStep, typeText);

        const secondSubmit = await screen.findByRole("button", {
          name: "Last details",
        });

        await userEvent.click(secondSubmit);

        // Third step
        const thirdStep = signUpLocationSchema({}).map<HTMLInputElement>(
          ({ label }) => screen.getByLabelText(label)
        );

        await multiType(thirdStep, typeText);

        // Step back

        const stepBack = await screen.findByRole("button", {
          name: "Step back",
        });

        await userEvent.click(stepBack);

        const secondStepAgain = await screen.findByLabelText(
          SignUpPasswordSchema({})[1].label
        );

        expect(secondStepAgain).toBeInTheDocument();

        // Step forward and submit
        const secondSubmitAgain = await screen.findByRole("button", {
          name: "Last details",
        });

        await userEvent.click(secondSubmitAgain);

        const thirdSubmit = await screen.findByRole("button", {
          name: "Sign up",
        });

        await userEvent.click(thirdSubmit);

        const successMessage = await screen.findByText(
          "Thank you for signing up! You will shortly be redirected to your dashboard."
        );

        expect(successMessage).toBeInTheDocument();
      });
    });
  });

  describe("When instantiated and the token is not required", () => {
    test("Then the form should start at the second step", async () => {
      mockIsTokenRequiredGetter.mockReturnValue(false);

      render(<SignUpForm />);

      const firstStep = screen.queryByLabelText(signUpTokenSchema[1].label);

      expect(firstStep).not.toBeInTheDocument();

      const firstSubmit = screen.queryByRole("button", {
        name: "Verify token",
      });

      expect(firstSubmit).not.toBeInTheDocument();

      // Second step
      SignUpPasswordSchema({}).forEach(({ label }) => {
        const node = screen.queryByLabelText(label);
        expect(node).toBeInTheDocument();
      });
    });
  });
});
