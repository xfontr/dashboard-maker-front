import { ChangeEvent } from "react";
import capitalize from "../../../utils/capitalize";
import {
  ComplexFormFields,
  limitInputLength,
  restrictCharTypes,
  SimpleFormFields,
} from "../Form.services";
import { FormField, FormSchema } from "../Form.types";

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

      const result = SimpleFormFields()(...names);

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

describe("Given a ComplexFormFields factory function", () => {
  describe("When called with global props and a list of input names with their respective props", () => {
    test("Then it should return a form schema with complete input fields", () => {
      const globalProps: Partial<FormField> = {
        inputProps: {
          id: "",
          className: "Test",
        },
      };

      const fieldsWithProps: [string, Partial<FormField>][] = [
        [
          "email",
          {
            fieldProps: {
              hidden: true,
            },
          },
        ],
      ];

      const values = {
        [fieldsWithProps[0][0]]: "test@test.com",
      };

      const expectedResult: FormSchema = [
        {
          label: capitalize(fieldsWithProps[0][0]),
          inputProps: {
            id: fieldsWithProps[0][0],
            className: "Test",
          },
          fieldProps: {
            hidden: true,
          },
          initialValue: values[fieldsWithProps[0][0]],
          tooltip: "",
        },
      ];

      const result = ComplexFormFields(values, globalProps)(...fieldsWithProps);

      expect(result).toStrictEqual(expectedResult);
    });
  });
});

describe("Given a limitInputLength fucntion", () => {
  describe("When called with a max length of '5' and received a string 'longerThan5'", () => {
    test("Then it should change the value to 'longe'", () => {
      const maxLength = 5;
      const passedWord = "longerThan5";
      const expectedWord = "longe";

      const mockEvent = {
        currentTarget: {
          value: passedWord,
        },
      } as ChangeEvent<HTMLInputElement>;

      limitInputLength(maxLength)(mockEvent);

      expect(mockEvent.currentTarget.value).toBe(expectedWord);
    });
  });

  describe("When called with a maax length of '5' and received a string 'four'", () => {
    test("Then it should not change said value", () => {
      const maxLength = 5;
      const passedWord = "four";

      const mockEvent = {
        currentTarget: {
          value: passedWord,
        },
      } as ChangeEvent<HTMLInputElement>;

      limitInputLength(maxLength)(mockEvent);

      expect(mockEvent.currentTarget.value).toBe(passedWord);
    });
  });
});

describe("Given a restrictCharTypes function", () => {
  describe("When called with a restriction 'number' and a value '9'", () => {
    test("Then it should return ''", () => {
      const restriction = "number";
      const passedWord = "9";

      const mockEvent = {
        currentTarget: {
          value: passedWord,
        },
      } as ChangeEvent<HTMLInputElement>;

      restrictCharTypes(restriction)(mockEvent);

      expect(mockEvent.currentTarget.value).toBe("");
    });
  });

  describe("When called with a restriction 'number' and a value 'a'", () => {
    test("Then it should return 'a'", () => {
      const restriction = "number";
      const passedWord = "a";

      const mockEvent = {
        currentTarget: {
          value: passedWord,
        },
      } as ChangeEvent<HTMLInputElement>;

      restrictCharTypes(restriction)(mockEvent);

      expect(mockEvent.currentTarget.value).toBe(passedWord);
    });
  });
});
