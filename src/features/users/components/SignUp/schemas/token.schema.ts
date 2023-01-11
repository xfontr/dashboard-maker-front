import { SimpleFormFields } from "../../../../../common/components/Form/Form.services";
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
  },
  {
    label: "Token code",
    inputProps: {
      id: "code",
      type: "password",
    },
  },
  ...SimpleFormFields({})("shit"),
];

export default signUpTokenSchema;
