import { HTMLAttributes } from "react";

/**
 * @example
 *   <JSXElement {...setProps(rest, "className", "button")} />;
 *
 * @param props Takes the element props
 * @param attribute Takes a prop attribute that will be added to a custom value
 * @param value The custom prop value
 * @returns Returns the original props, but having added the passed value
 */

const setProps = <T = unknown>(
  props: HTMLAttributes<T>,
  attribute: keyof HTMLAttributes<T>,
  value: string | number | boolean
) => ({
  ...props,
  [attribute]: props[attribute] ? `${value} ${props[attribute]}` : value,
});

export default setProps;
