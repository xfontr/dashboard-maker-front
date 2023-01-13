import worldStates from "../../../../../common/assets/worldStates";
import {
  FORM_CLASSES,
  INPUT_RULES,
} from "../../../../../common/components/Form/Form.constants";
import {
  ComplexFormFields,
  limitInputLength,
  restrictCharTypes,
} from "../../../../../common/components/Form/Form.services";
import { FormSchema } from "../../../../../common/components/Form/Form.types";
import { ProtoUser } from "../../../types/user.types";

const signUpLocationSchema = (values: Partial<ProtoUser>): FormSchema =>
  ComplexFormFields(values, {
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
        inputProps: {
          id: "",
          maxLength: INPUT_RULES.standardLong.max,
        },
      },
    ],
    [
      "streetExtraData",
      {
        fieldProps: {
          className: FORM_CLASSES.third,
        },
        inputProps: {
          id: "",
          maxLength: INPUT_RULES.standardShort.max,
        },
      },
    ],
    [
      "city",
      {
        fieldProps: {
          className: FORM_CLASSES.third,
        },
        inputProps: {
          id: "",
          onInput: restrictCharTypes("number"),
          maxLength: INPUT_RULES.standardShort.max,
        },
      },
    ],
    [
      "state",
      {
        fieldProps: {
          className: FORM_CLASSES.third,
        },
        inputProps: {
          id: "",
          renderas: "select",
          subprops: ["States...", ...worldStates],
        },
        initialValue: "States...",
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
  );

export default signUpLocationSchema;
