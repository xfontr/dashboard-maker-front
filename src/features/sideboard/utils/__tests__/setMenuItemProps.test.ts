import { HTMLAttributes } from "react";
import setMenuItemProps from "../setMenuItemProps";

describe("Given a setMenuItemProps function", () => {
  const baseClass = "menu-item";

  describe("When called with a group of attributes, an onClick attribute and only icons", () => {
    test("Then it should return the same attributes, but with new specific classes", () => {
      const props = {
        id: "#",
        onClick: () => {},
      } as HTMLAttributes<HTMLLIElement>;

      const expectedClass = `${baseClass} ${baseClass}--clickable ${baseClass}--contracted`;
      const expectedResult = { ...props, className: expectedClass };
      const onlyIcon = true;

      const result = setMenuItemProps(props, onlyIcon);

      expect(result).toStrictEqual(expectedResult);
    });
  });

  describe("When called with a group of attributes, without onClick nor icons", () => {
    test("Then it should return the same attributes, but without extra specific classes", () => {
      const props = {
        id: "#",
      } as HTMLAttributes<HTMLLIElement>;

      const expectedClass = baseClass;
      const expectedResult = { ...props, className: expectedClass };
      const onlyIcon = false;

      const result = setMenuItemProps(props, onlyIcon);

      expect(result).toStrictEqual(expectedResult);
    });
  });
});
