import setProps from "../../../utils/setProps";
import { FormGroupProps } from "../Form.types";

const FormGroup = ({ label, inputProps, ...rest }: FormGroupProps) => (
  <div
    {...setProps(rest, "className", "form__group")}
    data-testid="form__group"
  >
    <label htmlFor={inputProps.id}>{label}</label>
    {!inputProps.renderas && <input {...inputProps} />}
    {inputProps.renderas === "textarea" && (
      <textarea {...inputProps}></textarea>
    )}
  </div>
);

export default FormGroup;
