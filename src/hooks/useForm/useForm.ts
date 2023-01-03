import { ChangeEvent, useState } from "react";
import { FormSchema } from "../../common/components/Form/Form.types";
import { getSchemaValues, valueSetter } from "../../common/utils/formUtils";

const useForm = (schema: FormSchema) => {
  const schemaValues = getSchemaValues(schema);
  const [values, setValues] = useState(schemaValues);

  const onChange = ({
    target: { id, value },
  }: ChangeEvent<HTMLInputElement>) => {
    setValues(valueSetter(id, value));
  };

  return { values, onChange };
};

export default useForm;
