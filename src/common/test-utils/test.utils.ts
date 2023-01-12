import userEvent from "@testing-library/user-event";
import { FormSchema } from "../components/Form/Form.types";

/**
 * CAUTION: This function is only to be used for testing purposes. It converts
 * an schema to an object with only ids and empty values
 *
 * To be noted: it is very similar to the function getSchemaValues, not to say
 * identical. To prevent tests breaking because of changing said function, it
 * was decided to have a separate function that won't be altered
 */

export const simplifySchema = (schema: FormSchema): Record<string, string> =>
  schema.reduce(
    (newSchema, currentValue) => ({
      ...newSchema,
      [currentValue.inputProps.id]: "",
    }),
    {}
  );

/**
 * Simulates a user typing, as userEvent.type does. However, it takes a list of
 * input fields, which allows to apply the type method on many inputs at once
 *
 * @param inputList A list of input nodes
 * @param textToType The text that will be typed on each input
 */

export const multiType = async (
  inputList: HTMLInputElement[],
  textToType: string
): Promise<void> => {
  await inputList.reduce(async (previousPromise, element) => {
    await previousPromise;
    await userEvent.type(element, textToType);
    return Promise.resolve();
  }, Promise.resolve());
};
