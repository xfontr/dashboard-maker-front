import { FieldProps, FormSchema } from "./Form.types";
import Joi, { ObjectSchema } from "joi";
import formSchema from "./Form.schema";
import capitalize from "../../utils/capitalize";

/**
 * Converts a form schema into a simpler object with only each ID and each
 * initial value
 */

export const getSchemaValues = <T>(schema: FormSchema): T =>
  schema.reduce(
    (allInputs, current) => ({
      ...allInputs,
      [current.inputProps.id]: current.initialValue || "",
    }),
    {} as T
  );

/**
 * Simple helper to handle the state setter function. It takes the current
 * values and replaces the one with the passed id and value
 */

export const valueSetter =
  <T>(id: string, value?: string) =>
  (currentState: T): T => {
    const state = currentState;
    (state as Record<string, string>)[id] = value ?? "";
    return state;
  };

/**
 * Exported automatically with the global and generic form validation fields.
 *
 * @param values An object with the input ids and respective values. It will
 *   compare them with the validation schema
 * @returns First, it creates a completely new joi schema that contains solely
 *   the input ids selected. If an id is not in the generic schema, it will
 *   allow any sort of value. After that, it validates the passed values and
 *   returns a list of errors
 */

export const validateForm = (
  <T>(schema: ObjectSchema<T>) =>
  <R>(values: R): Joi.ValidationErrorItem[] | undefined => {
    const schemaWithOnlyPassedValues = Joi.object(
      Object.keys(values as object).reduce(
        (extractedSchema, key) => ({
          ...extractedSchema,
          [key]: Object(schema)._ids._byKey.get(key)
            ? schema.extract(key)
            : Joi.any(),
        }),
        {}
      )
    );

    return schemaWithOnlyPassedValues.validate(values, {
      abortEarly: false,
    }).error?.details;
  }
)<typeof formSchema>(formSchema);

export const setErrorClass = (
  errorDisplay: string,
  id: string,
  fieldProps?: FieldProps,
  errors?: Joi.ValidationErrorItem[]
) => ({
  className:
    errorDisplay !== "none" && errors?.find(({ path }) => path[0] === id)
      ? `${fieldProps?.className ?? ""} form--error`
      : fieldProps?.className,
});

export const curateErrorMessage = (message: string) => {
  const firstWord = message.split(" ")[0];

  return `${capitalize(firstWord.replace(/['"]+/g, ""))}${message.replace(
    firstWord,
    ""
  )}`;
};
