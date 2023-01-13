import joinValues from "../joinValues";

describe("Given a joinValues function", () => {
  describe("When called with input values and a current state of values", () => {
    test("Then it should return the current state and replace the matching values with the passed ones", () => {
      const passedValues = {
        email: "newTest@test.com",
        surname: "Doe",
      };

      const currentState = {
        email: "test@test.com",
        name: "John",
      };

      const expectedValues = {
        email: "newTest@test.com",
        name: "John",
        surname: "Doe",
      };

      const receivedValues = joinValues(passedValues)(currentState);

      expect(receivedValues).toStrictEqual(expectedValues);
    });
  });
});
