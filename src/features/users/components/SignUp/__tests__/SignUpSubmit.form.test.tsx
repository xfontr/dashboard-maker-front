import { render, renderHook, screen } from "@testing-library/react";
import useSteps from "../../../../../common/hooks/useSteps";
import mockUser from "../../../../../common/test-utils/mocks/mockUser";
import useRegistration from "../../../hooks/useRegistration";
import SignUpSubmitForm from "../formSteps/SignUpSubmit.form";
import signUpLocationSchema from "../schemas/location.schema";

const next = jest.fn() as ReturnType<typeof useSteps>["next"];
const previous = jest.fn() as ReturnType<typeof useSteps>["previous"];

describe("Given a SignUpSubmit form", () => {
  describe("When instantiated", () => {
    const {
      result: {
        current: { handleSignUpSubmit, setUser },
      },
    } = renderHook(useRegistration, { initialProps: next });

    test("Then it should display the corresponding fields to said form", () => {
      render(
        <SignUpSubmitForm
          handleSubmit={handleSignUpSubmit}
          values={mockUser}
          {...{ setUser, previous }}
        />
      );

      signUpLocationSchema({}).forEach(({ label }) => {
        const node = screen.getByLabelText(label);
        expect(node).toBeInTheDocument();
      });
    });

    test("Then some of the fields should have initial values", () => {
      render(
        <SignUpSubmitForm
          handleSubmit={handleSignUpSubmit}
          values={mockUser}
          {...{ setUser, previous }}
        />
      );

      signUpLocationSchema(mockUser).forEach(({ label, initialValue }) => {
        const node = screen.getByLabelText(label);
        expect(node).toHaveValue(initialValue ?? "");
      });
    });
  });
});
