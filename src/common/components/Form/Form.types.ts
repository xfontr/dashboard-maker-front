import {
  FormHTMLAttributes,
  HTMLAttributes,
  InputHTMLAttributes,
  ReactNode,
} from "react";
import useForm from "../../hooks/useForm";

export interface InputProps
  extends InputHTMLAttributes<
    HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  > {
  /**
   * Important: the ID attribute will be used to match the field with the form
   * validation schema
   */
  id: string;
  /** If undefined, will render as input */
  renderas?: "textarea" | "select";
  subprops?: any[];

  fieldvalue?: string;
}

export interface FieldProps extends HTMLAttributes<HTMLDivElement> {}

export interface FormGroupProps extends FieldProps {
  label: string;
  inputProps: InputProps;
  fieldValue?: string;
  children?: ReactNode;
  tooltip?: string;
}

export type FormField = {
  /**
   * The label attached to the input. As of now, it is mandatory, since it is a
   * better practice to always use labels. Rule: always write the first letter
   * in caps
   */
  label: string;
  /**
   * Allows any normal input or textarea attributes. Important: the ID attribute
   * will be used to match the field with the form validation schema
   */
  inputProps: InputProps;
  /** Allows any normal div attributes. Used to style input groups individually */
  fieldProps?: FieldProps;
  initialValue?: string | number;
  /** Information tag under the input. Renders only if defined */
  tooltip?: string;
};

export type FormSchema = FormField[];

export interface FormProps extends FormHTMLAttributes<HTMLFormElement> {
  children?: ReactNode;
  formHandler: ReturnType<typeof useForm>;
  errorDisplay?: "individual" | "global" | "none";
}
