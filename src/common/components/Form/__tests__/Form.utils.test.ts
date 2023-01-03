import schema from "../../../test-utils/mocks/mockFormSchema";
import simplifySchema from "../../../test-utils/simplifySchema";
import { getSchemaValues, valueSetter } from "../Form.utils";

describe("Given a getSchemaValues function", () => {
  describe("When called with a schema with a input", () => {
    test("Then it should return a simple list with the input and its value", () => {
      const expectedResult = simplifySchema(schema);

      const result = getSchemaValues(schema);

      expect(result).toStrictEqual(expectedResult);
    });
  });
});

describe("Given a valueSetter function", () => {
  describe("When called with a id, a value and a list of input values", () => {
    test("Then it should return said list with updated values", () => {
      const id = "test";
      const value = "test";
      const currentValues = {
        [id]: "",
      };

      const expectedValues = {
        [id]: value,
      };

      const result = valueSetter(id, value)(currentValues);

      expect(result).toStrictEqual(expectedValues);
    });
  });

  describe("When called with a id, an empty value and a list of input values", () => {
    test("Then it should return said list with updated values", () => {
      const id = "test";
      const values = {
        [id]: "",
      };

      const result = valueSetter(id)(values);

      expect(result).toStrictEqual(values);
    });
  });
});
