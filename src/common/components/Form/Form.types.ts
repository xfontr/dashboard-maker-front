import {
  FormHTMLAttributes,
  HTMLAttributes,
  InputHTMLAttributes,
  ReactNode,
} from "react";

export interface InputProps
  extends InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  id: string;
  renderas?: "textarea";
}

export interface FieldProps extends HTMLAttributes<HTMLDivElement> {}

export interface FormGroupProps extends FieldProps {
  label: string | number;
  inputProps: InputProps;
}

export type FormSchema = {
  label: string;
  inputProps: InputProps;
  fieldProps?: FieldProps;
}[];

export interface FormProps extends FormHTMLAttributes<HTMLFormElement> {
  children?: ReactNode;
  schema: FormSchema;
  errorDisplay?: "individual" | "global" | "none";
}
