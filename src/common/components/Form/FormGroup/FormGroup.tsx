import setProps from "../../../utils/setProps";
import { FormGroupProps } from "../Form.types";
import "./FormGroup.scss";

const FormGroup = ({
  label,
  inputProps,
  children,
  tooltip,
  ...rest
}: FormGroupProps) => (
  <div
    {...setProps(rest, "className", "form__group")}
    data-testid="form__group"
  >
    <label className="form__label" htmlFor={inputProps.id}>
      {label}
    </label>

    {tooltip && (
      <div className="form__tooltip">
        <i className="form__tooltip-icon">i</i>
        <span className="tooltip">{tooltip}</span>
      </div>
    )}

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
