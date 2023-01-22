import callFunctionIfExists from "../callFunctionIfExists";

describe("Given a callFunctionIfExists function", () => {
  describe("When called with a function and an argument 'Test'", () => {
    test("Then it should call said function with the argument", () => {
      const mockFunction = jest.fn();
      const mockArgument = "Test";

      callFunctionIfExists(mockFunction, mockArgument);

      expect(mockFunction).toHaveBeenCalledWith(mockArgument);
    });

    test("Then it should return the function's returned value", () => {
      const returnedValue = "Test";
      const mockFunction = jest.fn().mockReturnValue(returnedValue);

      const result = callFunctionIfExists(mockFunction);

      expect(result).toBe(returnedValue);
    });
  });

  describe("When called with no function", () => {
    test("Then it should do nothing", () => {
      const result = callFunctionIfExists();

      expect(result).toBeUndefined();
    });
  });
});
