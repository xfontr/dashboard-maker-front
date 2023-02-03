import Joi from "joi";
import { ChangeEvent, FormEventHandler, useState } from "react";
import { FormSchema } from "../components/Form/Form.types";
import {
  getSchemaValues,
  validateForm,
  valueSetter,
} from "../components/Form/Form.utils";
import callFunctionIfExists from "../utils/callFunctionIfExists";

const useForm = <T = Record<string, string>>(
  schema: FormSchema,
  onSubmit?: Function
) => {
  const [values, setValues] = useState<T>(getSchemaValues(schema));
  const [errors, setErrors] = useState<Joi.ValidationErrorItem[] | undefined>();

  const onChange = ({
    target: { id, value },
  }: ChangeEvent<HTMLInputElement>): void => {
    setValues(valueSetter<T>(id, value));
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const validatedForm = validateForm<T>(values);

    setErrors(validatedForm);

    if (validatedForm?.length) return;

    callFunctionIfExists(onSubmit, values);
  };

  return { values, errors, onChange, handleSubmit, schema };
};

export default useForm;
