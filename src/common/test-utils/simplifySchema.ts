import { FormSchema } from "../components/Form/Form.types";

/**
 * CAUTION: This function is only to be used for testing purposes. It converts
 * an schema to an object with only ids and empty values
 *
 * To be noted: it is very similar to the function getSchemaValues, not to say
 * identical. To prevent tests breaking because of changing said function, it
 * was decided to have a separate function that won't be altered
 */

const simplifySchema = (schema: FormSchema): Record<string, string> =>
  schema.reduce(
    (newSchema, currentValue) => ({
      ...newSchema,
      [currentValue.inputProps.id]: "",
    }),
    {}
  );

export default simplifySchema;
