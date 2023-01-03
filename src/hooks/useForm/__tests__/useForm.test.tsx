import { renderHook } from "@testing-library/react";
import { ChangeEvent } from "react";
import { act } from "react-dom/test-utils";
import schema from "../../../common/test-utils/mocks/mockFormSchema";
import simplifySchema from "../../../common/test-utils/simplifySchema";
import useForm from "../useForm";

const mockValueSetter = jest.fn().mockReturnValue(() => {});

jest.mock("../../../common/components/Form/Form.utils", () => ({
  ...jest.requireActual("../../../common/components/Form/Form.utils"),
  valueSetter: () => mockValueSetter,
}));

describe("Given a useForm component", () => {
  describe("When called with a form schema", () => {
    test("Then it should return a list of input values", () => {
      const {
        result: {
          current: { values },
        },
      } = renderHook(() => useForm(schema));

      const expectedValues = simplifySchema(schema);

      expect(values).toStrictEqual(expectedValues);
    });

    test("Then it should return an onChange function that updates the values", () => {
      const mockEvent = {
        target: {
          id: schema[0].inputProps.id,
          value: "newValue",
        },
      } as ChangeEvent<HTMLInputElement>;

      const {
        result: {
          current: { onChange },
        },
      } = renderHook(() => useForm(schema));

      act(() => {
        onChange(mockEvent);
      });

      expect(mockValueSetter).toHaveBeenCalledWith(simplifySchema(schema));
    });
  });
});
