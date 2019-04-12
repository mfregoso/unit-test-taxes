import TaxCalculator from "../src/classes/TaxCalculator";
import {taxpayerStd, taxpayerItem} from "../src/constants/test_data";
import { STD_DEDUCTION } from "../src/constants";

describe('Instantiation scenarios', () => {
  test('Empty argument', () => {
    expect(() => new TaxCalculator()).toThrowError("null-data");
  });
  test('Invalid argument values', () => {
    expect(() => new TaxCalculator({...taxpayerStd, isItemizing: "false"})).toThrowError("invalid-data");
  });
  test('Standard tax form', () => {
    const stdTax = new TaxCalculator(taxpayerStd);
    expect(stdTax).toBeInstanceOf(TaxCalculator);
  });
  test('Value of deductions when standard', () => {
    const stdTax = new TaxCalculator(taxpayerStd);
    expect(stdTax.deductions).toEqual(STD_DEDUCTION);
  });
  test('Itemized tax form', () => {
    const ItemTax = new TaxCalculator(taxpayerItem);
    expect(ItemTax).toBeInstanceOf(TaxCalculator);
  });
  test('Value of deductions when itemized = input', () => {
    const ItemTax = new TaxCalculator(taxpayerItem);
    expect(ItemTax.deductions).toEqual(taxpayerItem.deductions);
  });
});

describe('Standard deduction scenarios', () => {
  test('Income: 0', () => {
    const stdTax0 = new TaxCalculator(taxpayerStd);
    expect(stdTax0.getTaxLiability()).toEqual(0);
  });

  test('Income: 8,500', () => {
    const stdTax8500 = new TaxCalculator({...taxpayerStd, income: 8500});
    expect(stdTax8500.getTaxLiability()).toEqual(0);
  });

  test('Income: 8,502', () => {
    const stdTax8502 = new TaxCalculator({...taxpayerStd, income: 8502});
    expect(stdTax8502.getTaxLiability()).toEqual(1);
  });
});

describe('Itemized deduction scenarios', () => {
  test('Income: 0, Deductions: 0', () => {
    const itmTax = new TaxCalculator(taxpayerItem);
    expect(itmTax.validate()).toBeFalsy();
  });

  test('Income: 8,000, Deductions: 11,000', () => {
    const itmTax = new TaxCalculator({...taxpayerItem, income: 8000, deductions: 11000});
    expect(itmTax.getTaxLiability()).toEqual(0);
  });
});