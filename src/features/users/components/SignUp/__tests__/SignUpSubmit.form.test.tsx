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
    test("Then it should display the corresponding fields to said form", () => {
      const {
        result: {
          current: { handleSignUpSubmit, setUser },
        },
      } = renderHook(useRegistration, { initialProps: next });

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
  });
});
