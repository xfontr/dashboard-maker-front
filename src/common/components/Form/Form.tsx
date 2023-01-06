import useForm from "./useForm";
import { FormProps } from "./Form.types";
import FormGroup from "./FormGroup/FormGroup";
import "./Form.scss";
import PathErrors from "./PathErrors/PathErrors";
import FormErrors from "./FormErrors/FormErrors";
import { setErrorClass } from "./Form.utils";

const Form = ({
  children,
  schema,
  errorDisplay = "individual",
  ...rest
}: FormProps): JSX.Element => {
  const { values, errors, onChange, onSubmit } = useForm(schema, rest.onSubmit);

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
            {...setErrorClass(errorDisplay, inputProps.id, fieldProps, errors)}
            key={inputProps.id}
          >
            {errorDisplay === "individual" && (
              <PathErrors {...{ errors }} path={inputProps.id} />
            )}
          </FormGroup>
        ))}
        {children}
      </form>
      {errorDisplay === "global" && <FormErrors {...{ errors }} />}
    </>
  );
};

export default Form;
