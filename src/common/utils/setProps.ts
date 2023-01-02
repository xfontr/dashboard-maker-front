import { HTMLAttributes } from "react";

const setProps = <T = unknown>(
  props: HTMLAttributes<T>,
  attribute: keyof HTMLAttributes<T>,
  value: string | number | boolean
) => ({
  ...props,
  [attribute]: props[attribute] ? `${value} ${props[attribute]}` : value,
});

export default setProps;
