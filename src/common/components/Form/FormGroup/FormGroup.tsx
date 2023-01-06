import setProps from "../../../utils/setProps";
import { FormGroupProps } from "../Form.types";
import "./FormGroup.scss";

const FormGroup = ({
  label,
  inputProps,
  children,
  ...rest
}: FormGroupProps) => (
  <div
    {...setProps(rest, "className", "form__group")}
    data-testid="form__group"
  >
    <label className="form__label" htmlFor={inputProps.id}>
      {label}
    </label>

    {!inputProps.renderas && (
      <input {...setProps(inputProps, "className", "form__input")} />
    )}

    {inputProps.renderas === "textarea" && (
      <textarea
        {...setProps(inputProps, "className", "form__input")}
      ></textarea>
    )}

    {children}
  </div>
);

export default FormGroup;
