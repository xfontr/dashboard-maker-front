import { FormSchema } from "../../../common/components/Form/Form.types";
import capitalize from "../../../common/utils/capitalize";
import { IS_TOKEN_REQUIRED, MAIN_IDENTIFIER } from "../../../config/database";

const signUpSchema = (tokenMainValue: string): FormSchema => [
  {
    label: capitalize(MAIN_IDENTIFIER),
    inputProps: {
      id: MAIN_IDENTIFIER,
      disabled: IS_TOKEN_REQUIRED === true,
    },
    initialValue: tokenMainValue,
  },
  {
    label: "Name",
    inputProps: {
      id: "name",
    },
  },
  {
    label: "Password",
    inputProps: {
      id: "password",
      type: "password",
    },
  },
  {
    label: "Repeat password",
    inputProps: {
      id: "repeatPassword",
      type: "password",
    },
  },
];

export default signUpSchema;
