import concatIfTrue from "../concatIfTrue";

describe("Given a concatIfTrue function", () => {
  describe("When instantiated with 'Test', 'Test-concat' and true condition", () => {
    test("Then it should return 'Test Test-concat'", () => {
      const defaultValue = "Test";
      const addedValue = "Test-concat";
      const expectedResult = `${defaultValue} ${addedValue}`;

      const result = concatIfTrue(defaultValue, addedValue, true);

      expect(result).toBe(expectedResult);
    });
  });

  describe("When instantiated with 'Test', 'Test-concat' and a false condition", () => {
    test("Then it should return 'Test'", () => {
      const defaultValue = "Test";
      const addedValue = "Test-concat";

      const result = concatIfTrue(defaultValue, addedValue, false);

      expect(result).toBe(defaultValue);
    });
  });
});
