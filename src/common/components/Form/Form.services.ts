import capitalize from "../../utils/capitalize";
import { FormSchema } from "./Form.types";

/**
 * @example
 *   SimpleFormFields({ name: "John" })("name", "email");
 *   // In this case, the field email would be loaded with no initial value
 *
 * @param values An containing the id of the field and its initial value
 */

export const SimpleFormFields =
  (values: Record<string, string | number> = {}) =>
  (...names: string[]): FormSchema =>
    names.map((name) => ({
      label: capitalize(name),
      inputProps: {
        id: name,
      },
      initialValue: values[name] ?? "",
    }));
