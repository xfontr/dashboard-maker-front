import capitalize from "../capitalize";

describe("Given a capitalize function", () => {
  describe("When called with the word 'hello'", () => {
    test("Then it should return the word 'Hello'", () => {
      const wordToCapitalize = "hello";
      const capitalizedWord = "Hello";

      const result = capitalize(wordToCapitalize);

      expect(result).toBe(capitalizedWord);
    });
  });
});
