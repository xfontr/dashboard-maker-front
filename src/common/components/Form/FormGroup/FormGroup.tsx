import setProps from "../../../utils/setProps";
import { FormGroupProps } from "../Form.types";

const FormGroup = ({ label, inputProps, ...rest }: FormGroupProps) => (
  <div {...setProps(rest, "className", "form__group")}>
    <label htmlFor={inputProps.id}>{label}</label>
    {!inputProps.renderAs && <input {...inputProps} />}
    {inputProps.renderAs === "textarea" && (
      <textarea {...inputProps}></textarea>
    )}
  </div>
);

export default FormGroup;
