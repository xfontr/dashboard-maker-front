import { INPUT_RULES } from "../../components/Form/Form.constants";
import {
  limitInputLength,
  restrictCharTypes,
} from "../../components/Form/Form.services";
import { FormSchema } from "../../components/Form/Form.types";

const mockFormSchema: FormSchema = [
  {
    label: "Email",
    fieldProps: {
      className: "experiment",
    },
    inputProps: {
      id: "email",
      placeholder: "Placeholder test",
      onInput: restrictCharTypes("number"),
      maxLength: INPUT_RULES.email.max,
    },
  },
  {
    label: "Unvalidated input",
    inputProps: {
      id: "unvalidated",
    },
    tooltip: "Test",
  },
  {
    label: "Only numbers input",
    inputProps: {
      id: "number",
      type: "number",
      maxLength: 5,
      onInput: limitInputLength(5),
    },
  },
];

export default mockFormSchema;
