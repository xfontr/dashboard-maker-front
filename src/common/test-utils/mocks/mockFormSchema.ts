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
    },
  },
  {
    label: "Unvalidated input",
    inputProps: {
      id: "unvalidated",
    },
  },
];

export default mockFormSchema;
