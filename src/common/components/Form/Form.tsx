import useForm from "../../../hooks/useForm/useForm";
import { FormProps } from "./Form.types";
import FormErrors from "./FormErrors/FormErrors";
import FormGroup from "./FormGroup/FormGroup";

const Form = ({ children, schema }: FormProps): JSX.Element => {
  const { values, errors, onChange, onSubmit } = useForm(schema, () =>
    alert("")
  );

  return (
    <>
      <form className="form" {...{ onSubmit }}>
        {schema.map(({ label, inputProps, fieldProps }) => (
          <FormGroup
            {...{
              label,
              inputProps,
              value: values[inputProps.id],
              onChange,
            }}
            {...fieldProps}
            key={inputProps.id}
          />
        ))}
        {children}
      </form>

      {errors?.length && <FormErrors {...{ errors }} />}
    </>
  );
};

export default Form;
