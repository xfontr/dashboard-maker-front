import FORM_CLASSES from "../../../../../common/components/Form/Form.constants";
import {
  ComplexFormFields,
  limitInputLength,
} from "../../../../../common/components/Form/Form.services";
import { FormSchema } from "../../../../../common/components/Form/Form.types";
import { ProtoUser } from "../../../types/user.types";

const signUpLocationSchema = (values: Partial<ProtoUser>): FormSchema => [
  ...ComplexFormFields(values, {
    fieldProps: {
      className: FORM_CLASSES.half,
    },
  })(
    [
      "contactNumber",
      {
        inputProps: {
          id: "",
          type: "number",
          onInput: limitInputLength(11),
        },
      },
    ],
    [
      "additionalContactNumber",
      {
        inputProps: {
          id: "",
          type: "number",
          onInput: limitInputLength(11),
        },
      },
    ],
    [
      "street",
      {
        fieldProps: {
          className: FORM_CLASSES.seventh,
        },
      },
    ],
    [
      "streetExtraData",
      {
        fieldProps: {
          className: FORM_CLASSES.third,
        },
      },
    ],
    [
      "city",
      {
        fieldProps: {
          className: FORM_CLASSES.third,
        },
      },
    ],
    [
      "state",
      {
        fieldProps: {
          className: FORM_CLASSES.third,
        },
      },
    ],
    [
      "postalCode",
      {
        fieldProps: {
          className: FORM_CLASSES.third,
        },
        inputProps: {
          id: "",
          type: "number",
          onInput: limitInputLength(7),
        },
      },
    ]
  ),
];

export default signUpLocationSchema;
