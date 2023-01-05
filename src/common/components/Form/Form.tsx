import useForm from "./useForm";
import { FormProps } from "./Form.types";
import FormGroup from "./FormGroup/FormGroup";
import "./Form.scss";
import PathErrors from "./PathErrors/PathErrors";

const Form = ({ children, schema, ...rest }: FormProps): JSX.Element => {
  const { values, errors, onChange, onSubmit } = useForm(schema, rest.onSubmit);

  return (
    <>
      <form className="form" {...{ onSubmit }}>
        {schema.map(({ label, inputProps, fieldProps }) => (
          <>
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
            <PathErrors {...{ errors }} path={inputProps.id} />
          </>
        ))}
        {children}
      </form>
    </>
  );
};

export default Form;
