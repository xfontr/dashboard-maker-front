import { renderHook } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import useToggle from "../useToggle";

describe("Given a useToggle hook", () => {
  describe("When called with a default state of true and called its returned the toggle function", () => {
    test("Then it should store a value of false", () => {
      const { result } = renderHook(() => useToggle(true));

      act(() => {
        result.current[1]();
      });

      expect(result.current[0]).toBeFalsy();
    });
  });

  describe("When called and also called its returned the toggle function", () => {
    test("Then it should store a value of true", () => {
      const { result } = renderHook(useToggle);

      act(() => {
        result.current[1]();
      });

      expect(result.current[0]).toBeTruthy();
    });
  });
});
