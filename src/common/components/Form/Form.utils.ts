import { FieldProps, FormSchema } from "./Form.types";
import Joi, { ObjectSchema } from "joi";
import formSchema from "./Form.schema";
import capitalize from "../../utils/capitalize";

//TODO: Test implementation of initial value
export const getSchemaValues = (schema: FormSchema): Record<string, string> =>
  schema.reduce(
    (allInputs, current) => ({
      ...allInputs,
      [current.inputProps.id]: current.initialValue || "",
    }),
    {}
  );

export const valueSetter =
  (id: string, value?: string) => (currentState: Record<string, string>) => ({
    ...currentState,
    [id]: value ?? "",
  });

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
  <T = unknown>(schema: ObjectSchema<T>) =>
  (values: Record<string, string>): Joi.ValidationErrorItem[] | undefined => {
    const schemaWithOnlyPassedValues = Joi.object(
      Object.keys(values).reduce(
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
