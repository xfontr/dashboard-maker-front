import { FormSchema } from "../components/Form/Form.types";

const simplifySchema = (schema: FormSchema): Record<string, string> =>
  schema.reduce(
    (newSchema, currentValue) => ({
      ...newSchema,
      [currentValue.inputProps.id]: "",
    }),
    {}
  );

export default simplifySchema;
