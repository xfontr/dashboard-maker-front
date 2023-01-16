import { render, screen } from "@testing-library/react";
import Steps from "./Steps";

describe("Given a Steps component", () => {
  describe("When instantiated with a current step '0' and '4' total steps", () => {
    test("Then it should bold the current step and display the other ones", () => {
      const props = {
        currentStep: 0,
        totalSteps: 4,
      };

      render(<Steps {...props} />);

      const steps = Array(props.totalSteps)
        .fill("")
        .map((_, index) => screen.getByText((index + 1).toString()));

      steps.forEach((step) => expect(step).toBeInTheDocument());
      expect(steps[0].className).toBe("steps__step steps__step--current");
    });
  });
});
