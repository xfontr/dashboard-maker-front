import setProps from "../setProps";

describe("Given a setProps function", () => {
  describe("When instantiated with a list of attributes and a specific attribute and value", () => {
    test("Then it should return the original list adding the passed values", () => {
      const attributes = {
        className: "button--big",
      };

      const defaultAttribute = "className";
      const defaultValue = "button";

      const expectedProps = {
        className: `${defaultValue} ${attributes.className}`,
      };

      const finalProps = setProps(attributes, defaultAttribute, defaultValue);

      expect(finalProps).toStrictEqual(expectedProps);
    });
  });

  describe("When instantiated with a list of attributes and passing a specific attribute that said list doesn't have", () => {
    test("Then it should return said list adding the new attribute", () => {
      const attributes = {};

      const defaultAttribute = "className";
      const defaultValue = "button";

      const expectedProps = {
        [defaultAttribute]: defaultValue,
      };

      const finalProps = setProps(attributes, defaultAttribute, defaultValue);

      expect(finalProps).toStrictEqual(expectedProps);
    });
  });
});
