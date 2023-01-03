import useForm from "../../../hooks/useForm/useForm";
import { FormProps } from "./Form.types";
import FormGroup from "./FormGroup/FormGroup";

const Form = ({ children, schema }: FormProps): JSX.Element => {
  const { values, onChange } = useForm(schema);

  return (
    <form className="form">
      {schema.map(({ label, inputProps, fieldProps }) => (
        <FormGroup
          {...{
            label,
            inputProps,
            value: values[inputProps.id],
            onChange,
          }}
          {...fieldProps}
          key={inputProps.name}
        />
      ))}
      {children}
    </form>
  );
};

export default Form;
