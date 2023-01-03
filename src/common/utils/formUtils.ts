import { FormSchema } from "../components/Form/Form.types";

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
