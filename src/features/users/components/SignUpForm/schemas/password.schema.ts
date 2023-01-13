import FORM_CLASSES from "../../../../../common/components/Form/Form.constants";
import { ComplexFormFields } from "../../../../../common/components/Form/Form.services";
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

  ...ComplexFormFields(values, {
    fieldProps: {
      className: FORM_CLASSES.half,
    },
  })(["name", {}], ["surname", {}]),

  ...ComplexFormFields(values, {
    inputProps: {
      id: "",
      type: "password",
    },
    fieldProps: {
      className: FORM_CLASSES.half,
    },
  })(["password", {}], ["repeatPassword", {}]),
];

export default SignUpPasswordSchema;
