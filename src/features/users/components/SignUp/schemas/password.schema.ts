import { SimpleFormFields } from "../../../../../common/components/Form/Form.services";
import { FormSchema } from "../../../../../common/components/Form/Form.types";
import capitalize from "../../../../../common/utils/capitalize";
import {
  IS_TOKEN_REQUIRED,
  MAIN_IDENTIFIER,
} from "../../../../../config/database";
import { ProtoUser } from "../../../types/user.types";

const SignUpPasswordSchema = (values?: Partial<ProtoUser>): FormSchema => [
  {
    label: capitalize(MAIN_IDENTIFIER),
    inputProps: {
      id: MAIN_IDENTIFIER,
      disabled: IS_TOKEN_REQUIRED,
    },
    initialValue: values ? values[MAIN_IDENTIFIER] : "",
  },

  ...SimpleFormFields(values)("name", "surname"),

  {
    label: "Password",
    inputProps: {
      id: "password",
      type: "password",
    },
    initialValue: values?.password,
  },
  {
    label: "Repeat password",
    inputProps: {
      id: "repeatPassword",
      type: "password",
    },
    initialValue: values?.repeatPassword,
  },
];

export default SignUpPasswordSchema;
