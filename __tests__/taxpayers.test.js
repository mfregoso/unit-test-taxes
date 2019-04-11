import TaxPayer from "../src/classes/TaxPayer";
import {taxpayerStd, taxpayerItem} from "../src/constants/test_data";
import {STD_DEDUCTION} from "../src/constants";

describe('New Taxpayers', () => {
  test('Standard: no income', () => {
    const sTaxpayer = new TaxPayer(taxpayerStd);
    expect(sTaxpayer).toBeInstanceOf(TaxPayer);
  });

  test('Standard taxpayer = input', () => {
    const sTaxpayer = new TaxPayer(taxpayerStd);
    expect(sTaxpayer.deductions).toEqual(STD_DEDUCTION);
  });

  test('Itemized: no income/deductions', () => {
    const iTaxpayer = new TaxPayer(taxpayerItem);
    expect(iTaxpayer).toBeInstanceOf(TaxPayer);
  });

  test('Itemized taxpayer = input', () => {
    const iTaxpayer = new TaxPayer(taxpayerItem);
    expect(iTaxpayer).toEqual(taxpayerItem);
  });

});
