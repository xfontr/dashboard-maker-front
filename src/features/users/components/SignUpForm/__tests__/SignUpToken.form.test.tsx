import { render, renderHook, screen } from "@testing-library/react";
import useSteps from "../../../../../common/hooks/useSteps";
import useRegistration from "../../../hooks/useRegistration";
import SignUpTokenForm from "../formSteps/SignUpToken.form";
import signUpTokenSchema from "../schemas/token.schema";

const next = jest.fn() as ReturnType<typeof useSteps>["next"];

describe("Given a SignUpToken form", () => {
  describe("When instantiated", () => {
    test("Then it should display the corresponding fields to said form", () => {
      const {
        result: {
          current: { handleTokenSubmit },
        },
      } = renderHook(useRegistration, { initialProps: next });

      render(<SignUpTokenForm handleSubmit={handleTokenSubmit} />);

      signUpTokenSchema.forEach(({ label }) => {
        const node = screen.getByLabelText(label);
        expect(node).toBeInTheDocument();
      });
    });
  });
});
