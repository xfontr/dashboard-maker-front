import { FormSchema } from "../../../common/components/Form/Form.types";

const tokenSchema: FormSchema = [
  {
    label: "Email",
    inputProps: {
      id: "email",
      placeholder: "email@email.com",
    },
  },
  {
    label: "Token",
    inputProps: {
      id: "token",
      type: "password",
    },
  },
];

export default tokenSchema;
