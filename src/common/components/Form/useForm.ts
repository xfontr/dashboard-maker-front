import Joi from "joi";
import { ChangeEvent, FormEventHandler, useState } from "react";
import { FormSchema } from "./Form.types";
import { getSchemaValues, validateForm, valueSetter } from "./Form.utils";

const useForm = (schema: FormSchema, action?: Function) => {
  const [values, setValues] = useState(getSchemaValues(schema));
  const [errors, setErrors] = useState<Joi.ValidationErrorItem[] | undefined>();

  const onChange = ({
    target: { id, value },
  }: ChangeEvent<HTMLInputElement>) => {
    setValues(valueSetter(id, value));
  };

  const onSubmit: FormEventHandler<HTMLFormElement> = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const validatedForm = validateForm(values);

    setErrors(validatedForm);

    if (validatedForm?.length) return;

    action && action();
  };

  return { values, errors, onChange, onSubmit };
};

export default useForm;
