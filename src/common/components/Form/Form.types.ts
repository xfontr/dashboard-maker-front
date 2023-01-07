import {
  FormHTMLAttributes,
  HTMLAttributes,
  InputHTMLAttributes,
  ReactNode,
} from "react";

export interface InputProps
  extends InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  /**
   * Important: the ID attribute will be used to match the field with the form
   * validation schema
   */
  id: string;
  /** If undefined, will render as input */
  renderas?: "textarea";
}

export interface FieldProps extends HTMLAttributes<HTMLDivElement> {}

export interface FormGroupProps extends FieldProps {
  label: string | number;
  inputProps: InputProps;
  children?: ReactNode;
}

export type FormSchema = {
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
}[];

export interface FormProps extends FormHTMLAttributes<HTMLFormElement> {
  children?: ReactNode;
  schema: FormSchema;
  errorDisplay?: "individual" | "global" | "none";
}
