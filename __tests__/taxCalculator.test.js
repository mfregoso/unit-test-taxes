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
    const itemTax = new TaxCalculator(taxpayerItem);
    expect(itemTax).toBeInstanceOf(TaxCalculator);
  });
  test('Value of deductions when itemized = input', () => {
    const itemTax = new TaxCalculator(taxpayerItem);
    expect(itemTax.deductions).toEqual(taxpayerItem.deductions);
  });
});

describe('STANDARD: 15% bracket scenarios', () => {
  test('Income: 0', () => {
    const stdTax0 = new TaxCalculator(taxpayerStd);
    expect(stdTax0.getTaxLiability()).toEqual(0);
  });

  test('Income: 16,500, IRA: 0', () => {
    const stdTax16500 = new TaxCalculator({...taxpayerStd, income: 16500});
    expect(stdTax16500.getTaxLiability()).toEqual(0);
  });

  test('Income: 16,502, IRA: 0', () => {
    const stdTax16502 = new TaxCalculator({...taxpayerStd, income: 16502});
    expect(stdTax16502.getTaxLiability()).toEqual(1);
  });

  test('Income: 22500, IRA: 5500', () => {
    const stdTax = new TaxCalculator({...taxpayerStd, income: 22500, iraContrib: 5500});
    expect(stdTax.getTaxLiability()).toEqual(75);
  });

  test('Income: 22000, IRA: 5500', () => {
    const stdTax = new TaxCalculator({...taxpayerStd, income: 22000, iraContrib: 5500});
    expect(stdTax.getTaxLiability()).toEqual(0);
  });

  test('Income: 79500, IRA: 3000', () => {
    const stdTax = new TaxCalculator({...taxpayerStd, income: 79500, iraContrib: 3000});
    expect(stdTax.getTaxLiability()).toEqual(9000);
  });
});

describe('STANDARD: 20% bracket scenarios', () => {
  test('Income: 0', () => {
    const stdTax0 = new TaxCalculator(taxpayerStd);
    expect(stdTax0.getTaxLiability()).toEqual(0);
  });

  test('Income: 16,500, IRA: 0', () => {
    const stdTax16500 = new TaxCalculator({...taxpayerStd, income: 16500});
    expect(stdTax16500.getTaxLiability()).toEqual(0);
  });
});

describe('ITEMIZED: 15% bracket scenarios', () => {
  test('Income: 0, Deductions: 0', () => {
    const itmTax = new TaxCalculator(taxpayerItem);
    expect(itmTax.checkForm().isValid).toBeFalsy();
  });

  test('Income: 8000, Deductions: 13000', () => {
    const itmTax = new TaxCalculator({...taxpayerItem, income: 8000, deductions: 13000});
    expect(itmTax.getTaxLiability()).toEqual(0);
  });

  test('Income: 22000, Deductions: 12500, IRA: 5500', () => {
    const itmTax = new TaxCalculator({...taxpayerItem, income: 22000, deductions: 12500, iraContrib: 5500});
    expect(itmTax.getTaxLiability()).toEqual(0);
  });

  test('Income: 79500, Deductions: 12500, IRA: 3000', () => {
    const itmTax = new TaxCalculator({...taxpayerItem, income: 79500, deductions: 12500, iraContrib: 3000});
    expect(itmTax.getTaxLiability()).toEqual(9000);
  });

  test('Income: 75000, Deductions: 24000, IRA: 0', () => {
    const itmTax = new TaxCalculator({...taxpayerItem, income: 75000, deductions: 24000, iraContrib: 0});
    expect(itmTax.getTaxLiability()).toEqual(7050);
  });
});