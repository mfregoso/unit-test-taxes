import { roundUp, posNumber, isNumber } from "../src/utils/index";

describe('Utilities Test', () => {
  test("Round up valid numbers", () => {
    expect(roundUp(2.1)).toBe(3);
    expect(roundUp("10.9")).toBe(11);
  });

  test("Round up error: NaN input", () => {
    expect(() => roundUp("hello")).toThrowError('invalid-number');
  });

  test("Valid positive numbers", () => {
    expect(posNumber(2.1)).toBeTruthy();
    expect(posNumber("10.9")).toBeTruthy();
    expect(posNumber("")).toBeTruthy();
  });

  test("Invalid positive numbers", () => {
    expect(posNumber("hi")).toBeFalsy();
    expect(posNumber(null)).toBeFalsy();
    expect(posNumber({})).toBeFalsy();
  });

  test("Is a number", () => {
    expect(isNumber(2.1)).toBeTruthy();
    expect(isNumber("10.9")).toBeTruthy();
    expect(isNumber("")).toBeTruthy();
  });

  test("Is not a number", () => {
    expect(isNumber("hi")).toBeFalsy();
    expect(isNumber(null)).toBeFalsy();
    expect(isNumber(undefined)).toBeFalsy();
    expect(isNumber({})).toBeFalsy();
  });
});
