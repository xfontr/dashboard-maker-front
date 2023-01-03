import { HTMLAttributes, InputHTMLAttributes, ReactNode } from "react";

export interface InputProps
  extends InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  id: string;
  renderAs?: "textarea";
}

export interface FieldProps extends HTMLAttributes<HTMLDivElement> {}

export interface FormGroupProps extends FieldProps {
  label: string | number;
  inputProps: InputProps;
}

export type FormSchema = {
  label: string;
  inputProps: InputProps;
  fieldProps: FieldProps;
}[];

export type FormProps = {
  children?: ReactNode;
  schema: FormSchema;
};
