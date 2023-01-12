import { FormSchema } from "../../../../../common/components/Form/Form.types";
import capitalize from "../../../../../common/utils/capitalize";
import { MAIN_IDENTIFIER } from "../../../../../config/database";

const signUpTokenSchema: FormSchema = [
  {
    label: capitalize(MAIN_IDENTIFIER),
    inputProps: {
      id: MAIN_IDENTIFIER,
      placeholder: "email@email.com",
    },
    tooltip: "Your email",
  },
  {
    label: "Token code",
    inputProps: {
      id: "code",
      type: "password",
    },
  },
];

export default signUpTokenSchema;
