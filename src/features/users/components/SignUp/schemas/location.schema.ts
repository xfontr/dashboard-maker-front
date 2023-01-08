import { SimpleFormFields } from "../../../../../common/components/Form/Form.services";
import { FormSchema } from "../../../../../common/components/Form/Form.types";
import { ProtoUser } from "../../../types/user.types";

const signUpLocationSchema = (values: Partial<ProtoUser>): FormSchema => [
  ...SimpleFormFields(values)("mobile", "street", "city", "state"),

  {
    label: "Postal code",
    inputProps: {
      id: "postalCode",
    },
  },
];

export default signUpLocationSchema;
