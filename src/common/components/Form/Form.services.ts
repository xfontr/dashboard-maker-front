import capitalize from "../../utils/capitalize";
import { FormSchema } from "./Form.types";

//TODO: Test pending

export const SimpleFormFields =
  (values: Record<string, string | number>) =>
  (...args: string[]): FormSchema =>
    args.map((name) => ({
      label: capitalize(name),
      inputProps: {
        id: name,
      },
      initialValue: values[name] ?? "",
    }));
