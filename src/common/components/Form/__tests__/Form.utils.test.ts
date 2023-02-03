import { mockFormSchema as schema } from "../../../test-utils/mocks/";
import { simplifySchema } from "../../../test-utils/test.utils";
import {
  curateErrorMessage,
  getSchemaValues,
  setErrorClass,
  validateForm,
  valueSetter,
} from "../Form.utils";

describe("Given a getSchemaValues function", () => {
  describe("When called with a schema with a input", () => {
    test("Then it should return a simple list with the input and its empty value", () => {
      const expectedResult = simplifySchema(schema);

      const result = getSchemaValues(schema);

      expect(result).toStrictEqual(expectedResult);
    });
  });

  describe("When called with a schema with a input and an initial value of 'Test'", () => {
    test("Then it should return a simple list with the input and said value", () => {
      schema[0].initialValue = "Test";
      const expectedResult = simplifySchema(schema);
      expectedResult[schema[0].inputProps.id] = "Test";

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

describe("Given a validateForm function", () => {
  describe("When called with invalid form values", () => {
    test("Then it should return a list of errors", () => {
      const expectedErrors = [
        {
          context: { key: "email", label: "email", value: "" },
          message: '"email" is not allowed to be empty',
          path: ["email"],
          type: "string.empty",
        },
      ];

      const values = simplifySchema(schema);

      const validatedForm = validateForm(values);

      expect(validatedForm).toStrictEqual(expectedErrors);
    });
  });

  describe("When called with valid form values", () => {
    test("Then it should return nothing", () => {
      const values = simplifySchema(schema);
      values[schema[0].inputProps.id] = "valid@email.com";

      const validatedForm = validateForm(values);

      expect(validatedForm).toBeUndefined();
    });
  });
});

describe("Given a setErrorClass function", () => {
  describe("When called with a display style other than 'none' and an error that matches an input", () => {
    test("Then it should return the default class and 'form--error' if there are errors", () => {
      const errorDisplay = "individual";
      const errors = validateForm(simplifySchema(schema));
      const errorClass = {
        className: `${schema[0].fieldProps?.className} form--error`,
      };

      const result = setErrorClass(
        errorDisplay,
        schema[0].inputProps.id,
        schema[0].fieldProps,
        errors
      );

      expect(result).toStrictEqual(errorClass);
    });

    test("Then it should return only ' form-error' if there are errors", () => {
      const errorDisplay = "individual";
      const errors = validateForm(simplifySchema(schema));
      const errorClass = {
        className: " form--error",
      };

      const result = setErrorClass(
        errorDisplay,
        schema[0].inputProps.id,
        {},
        errors
      );

      expect(result).toStrictEqual(errorClass);
    });

    test("Then it should return the default class if there are no errors", () => {
      const errorDisplay = "individual";
      const errors = validateForm({
        [schema[0].inputProps.id]: "valid@valid.com",
      });
      const errorClass = {
        className: schema[0].fieldProps?.className,
      };

      const result = setErrorClass(
        errorDisplay,
        schema[0].inputProps.id,
        schema[0].fieldProps,
        errors
      );

      expect(result).toStrictEqual(errorClass);
    });
  });

  describe("When called with a display style 'none'", () => {
    test("Then it should load the passed default class", () => {
      const errorDisplay = "none";
      const errors = validateForm(simplifySchema(schema));
      const errorClass = {
        className: schema[0].fieldProps?.className,
      };

      const result = setErrorClass(
        errorDisplay,
        schema[0].inputProps.id,
        schema[0].fieldProps,
        errors
      );

      expect(result).toStrictEqual(errorClass);
    });
  });
});

describe("Given a curateErrorMessage function", () => {
  describe("When called with a error message of 'tokenCode' invalid", () => {
    test("Then it should return 'Token Code invalid'", () => {
      const initialErrorMessage = '"tokenCode" invalid';
      const expectedErrorMessage = "Token Code invalid";

      const result = curateErrorMessage(initialErrorMessage);

      expect(result).toBe(expectedErrorMessage);
    });
  });
});
