import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import signUpLocationSchema from "./schemas/location.schema";
import SignUpPasswordSchema from "./schemas/password.schema";
import signUpTokenSchema from "./schemas/token.schema";
import SignUpForm from "./SignUpForm";

describe("Given a SignUpForm component", () => {
  describe("When instantiated", () => {
    describe("If the user fills and submits correctly the three steps", () => {
      test("Then it should submit the form", async () => {
        const typeText = "email@email.com";
        render(<SignUpForm />);

        // First step
        const firstStep = signUpTokenSchema.map(({ label }) =>
          screen.getByLabelText(label)
        );

        await firstStep.reduce(async (previousPromise, element) => {
          await previousPromise;
          await userEvent.type(element, typeText);
          return Promise.resolve();
        }, Promise.resolve());

        const firstSubmit = screen.getByRole("button", {
          name: "Verify token",
        });

        await userEvent.click(firstSubmit);

        // Second step
        const secondStep = SignUpPasswordSchema({}).map(({ label }) =>
          screen.findByLabelText(label)
        );

        await secondStep.reduce(async (previousPromise, element) => {
          await previousPromise;
          await userEvent.type(await element, typeText);
          return Promise.resolve();
        }, Promise.resolve());

        const secondSubmit = await screen.findByRole("button", {
          name: "Last details",
        });

        await userEvent.click(secondSubmit);

        // Third step
        const thirdStep = signUpLocationSchema({}).map(({ label }) =>
          screen.findByLabelText(label)
        );

        await thirdStep.reduce(async (previousPromise, element) => {
          await previousPromise;
          await userEvent.type(await element, typeText);
          return Promise.resolve();
        }, Promise.resolve());

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
});
