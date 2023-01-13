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
          placeholder: "674251888",
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
          placeholder: "934197788",
        },
      },
    ],
    [
      "street",
      {
        fieldProps: { className: FORM_CLASSES.seventh },
        inputProps: {
          id: "",
          maxLength: INPUT_RULES.standardLong.max,
          placeholder: "Urgell Street",
        },
      },
    ],
    [
      "streetExtraData",
      {
        fieldProps: { className: FORM_CLASSES.third },
        inputProps: {
          id: "",
          maxLength: INPUT_RULES.standardShort.max,
          placeholder: "Block C",
        },
      },
    ],
    [
      "state",
      {
        fieldProps: { className: FORM_CLASSES.third },
        inputProps: {
          id: "",
          renderas: "select",
          subprops: ["States...", ...worldStates],
        },
        initialValue: "States...",
      },
    ],
    [
      "city",
      {
        fieldProps: { className: FORM_CLASSES.third },
        inputProps: {
          id: "",
          onInput: restrictCharTypes("number"),
          maxLength: INPUT_RULES.standardShort.max,
          placeholder: "Barcelona",
        },
      },
    ],

    [
      "postalCode",
      {
        fieldProps: { className: FORM_CLASSES.third },
        inputProps: {
          id: "",
          type: "number",
          onInput: limitInputLength(7),
          placeholder: "00000",
        },
      },
    ]
  );

export default signUpLocationSchema;
