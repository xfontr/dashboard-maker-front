import { ChangeEvent } from "react";
import camelToRegular from "../../utils/camelToRegular";
import capitalize from "../../utils/capitalize";
import { FormField, FormSchema } from "./Form.types";

/**
 * @example
 *   SimpleFormFields({ name: "John" })("name", "email");
 *   // In this case, the field email would be loaded with no initial value
 *
 * @param values An object containing the id of the field and its initial value
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

/**
 * @example
 *   SimpleFormFields(
 *     { name: "John" },
 *     { inputProps: { className: "input--name" } } // Use this param to apply global attributes to each field
 *   )([
 *     "name",
 *     {
 *       fieldProps: {
 *         disabled: true,
 *       },
 *     }, // Use this param to apply individual attributes to the current field
 *   ]);
 *
 * @param values An object containing the id of the field and its initial value
 * @param applyToAll An object containing the props that will be applied to each
 *   input and field
 */

export const ComplexFormFields =
  (
    values: Record<string, string | number> = {},
    applyToAll?: Partial<FormField>
  ) =>
  (...names: [string, Partial<FormField>][]): FormSchema =>
    names.map(([name, field]) => ({
      label: capitalize(camelToRegular(name)),
      inputProps: {
        ...applyToAll?.inputProps,
        ...field.inputProps,
        id: name,
      },
      fieldProps: {
        ...applyToAll?.fieldProps,
        ...field.fieldProps,
      },
      initialValue: applyToAll?.initialValue ?? values[name] ?? "",
      tooltip: applyToAll?.tooltip ?? field.tooltip ?? "",
    }));

/**
 * This function is to be only used with input type of "number", where the HTML
 * "maxlenth" attribute won't work
 */

export const limitInputLength =
  (maxLength: number) =>
  (event: ChangeEvent<HTMLInputElement>): void => {
    if (event.currentTarget.value.length > maxLength)
      event.currentTarget.value = event.currentTarget.value.slice(0, maxLength);
  };
