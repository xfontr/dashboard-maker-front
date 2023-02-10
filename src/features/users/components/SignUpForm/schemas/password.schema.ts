import {
  FORM_CLASSES,
  INPUT_RULES,
} from "../../../../../common/components/Form/Form.constants";
import {
  ComplexFormFields,
  restrictCharTypes,
} from "../../../../../common/components/Form/Form.services";
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
      maxLength: INPUT_RULES[MAIN_IDENTIFIER].max,
      className: FORM_CLASSES.icon("email"),
      placeholder: "email@email.com",
    },

    initialValue: values ? values[MAIN_IDENTIFIER] : "",
  },

  ...ComplexFormFields(values, {
    fieldProps: { className: FORM_CLASSES.half },
    inputProps: {
      id: "",
      onInput: restrictCharTypes("number"),
      maxLength: INPUT_RULES.name.max,
    },
  })(
    [
      "name",
      {
        inputProps: {
          id: "",
          placeholder: "John",
          className: FORM_CLASSES.icon("user"),
        },
      },
    ],
    ["surname", { inputProps: { id: "", placeholder: "Doe" } }]
  ),

  ...ComplexFormFields(values, {
    inputProps: {
      id: "",
      type: "password",
      maxLength: INPUT_RULES.password.max,
      className: FORM_CLASSES.icon("lock"),
    },
    fieldProps: { className: FORM_CLASSES.half },
  })(
    ["password", { tooltip: "Must contain at least 8 characters" }],
    ["repeatPassword", {}]
  ),
];

export default SignUpPasswordSchema;
