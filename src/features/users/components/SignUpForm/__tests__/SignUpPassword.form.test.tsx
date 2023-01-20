import { render, renderHook, screen } from "@testing-library/react";
import useSteps from "../../../../../common/hooks/useSteps";
import { mockUser } from "../../../../../common/test-utils/mocks";
import useRegistration from "../../../hooks/useRegistration";
import SignUpPasswordForm from "../formSteps/SignUpPassword.form";
import SignUpPasswordSchema from "../schemas/password.schema";

const next = jest.fn() as ReturnType<typeof useSteps>["next"];

describe("Given a SignUpPassword form", () => {
  const {
    result: {
      current: { handlePasswordSubmit },
    },
  } = renderHook(useRegistration, { initialProps: next });

  describe("When instantiated", () => {
    test("Then it should display the corresponding fields to said form", () => {
      render(
        <SignUpPasswordForm
          handleSubmit={handlePasswordSubmit}
          values={mockUser}
        />
      );

      SignUpPasswordSchema({}).forEach(({ label }) => {
        const node = screen.getByLabelText(label);
        expect(node).toBeInTheDocument();
      });
    });

    test("Then some of the fields should have initial values", () => {
      render(
        <SignUpPasswordForm
          handleSubmit={handlePasswordSubmit}
          values={mockUser}
        />
      );

      SignUpPasswordSchema(mockUser).forEach(({ label, initialValue }) => {
        const node = screen.getByLabelText(label);
        expect(node).toHaveValue(initialValue ?? "");
      });
    });
  });
});
