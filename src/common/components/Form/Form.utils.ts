import { FormSchema } from "./Form.types";
import Joi, { ObjectSchema, ValidationResult } from "joi";
import formSchema from "./Form.schema";

export const getSchemaValues = (schema: FormSchema): Record<string, string> =>
  schema.reduce(
    (allInputs, current) => ({
      ...allInputs,
      [current.inputProps.id]: "",
    }),
    {}
  );

export const valueSetter =
  (id: string, value?: string) => (currentState: Record<string, string>) => ({
    ...currentState,
    [id]: value ?? "",
  });

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
