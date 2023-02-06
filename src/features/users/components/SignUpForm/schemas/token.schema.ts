import { FORM_CLASSES } from "../../../../../common/components/Form/Form.constants";
import { FormSchema } from "../../../../../common/components/Form/Form.types";
import capitalize from "../../../../../common/utils/capitalize";
import { MAIN_IDENTIFIER } from "../../../../../config/database";

const signUpTokenSchema: FormSchema = [
  {
    label: capitalize(MAIN_IDENTIFIER),
    inputProps: {
      id: MAIN_IDENTIFIER,
      placeholder: "email@email.com",
      className: FORM_CLASSES.icon("email"),
    },
  },
  {
    label: "Token code",
    inputProps: {
      id: "code",
      type: "password",
    },
    tooltip: "It may not be required if the administrator specified so",
  },
];

export default signUpTokenSchema;
