import capitalize from "../../../utils/capitalize";
import { SimpleFormFields } from "../Form.services";
import { FormSchema } from "../Form.types";

describe("Given a SimpleFormFields factory function", () => {
  describe("When called with a list of input names", () => {
    test("Then it should return a form schema with complete input fields", () => {
      const names = ["email"];

      const expectedResult: FormSchema = [
        {
          label: capitalize(names[0]),
          inputProps: {
            id: names[0],
          },
          initialValue: "",
        },
      ];

      const result = SimpleFormFields({})(...names);

      expect(result).toStrictEqual(expectedResult);
    });
  });

  describe("When called with a list of input names and their respective values", () => {
    test("Then it should return a form schema with complete input fields with values", () => {
      const names = ["email"];

      const values = {
        [names[0]]: "test@test.com",
      };

      const expectedResult: FormSchema = [
        {
          label: capitalize(names[0]),
          inputProps: {
            id: names[0],
          },
          initialValue: values[names[0]],
        },
      ];

      const result = SimpleFormFields(values)(...names);

      expect(result).toStrictEqual(expectedResult);
    });
  });
});
