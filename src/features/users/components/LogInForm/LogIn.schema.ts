import {
  FORM_CLASSES,
  INPUT_RULES,
} from "../../../../common/components/Form/Form.constants";
import { ComplexFormFields } from "../../../../common/components/Form/Form.services";
import { FormSchema } from "../../../../common/components/Form/Form.types";
import capitalize from "../../../../common/utils/capitalize";
import { MAIN_IDENTIFIER } from "../../../../config/database";

const logInSchema: FormSchema = [
  {
    label: capitalize(MAIN_IDENTIFIER),
    inputProps: {
      id: MAIN_IDENTIFIER,
      placeholder: "email@email.com",
      className: FORM_CLASSES.icon("email"),
    },
  },
  ...ComplexFormFields(
    {},
    {
      inputProps: {
        id: "",
        type: "password",
        maxLength: INPUT_RULES.password.max,
        className: FORM_CLASSES.icon("lock"),
      },
    }
  )(["password", {}]),
];

export default logInSchema;
