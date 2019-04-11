import {roundUp} from "../utils";
import {TAX_RATE, STD_DEDUCTION} from "../constants";
import TaxPayer from "./TaxPayer";

export default class TaxCalculator {
  constructor(taxpayer) {
    if (!taxpayer instanceof TaxPayer) throw new Error("invalid-taxpayer");
    this.taxpayer = taxpayer;
    this.taxLiability = 0;
  }

  getAdjIncome() {
    const adjIncome = this.taxpayer.income - this.taxpayer.deductions;
    return adjIncome < 0 ? 0: adjIncome;
  }

  getTaxLiability() {
    const taxableIncome = this.getAdjIncome();
    const taxLiability = taxableIncome * TAX_RATE;
    return roundUp(taxLiability);
  }

  validate() {
    if (this.taxpayer.isItemizing && this.taxpayer.deductions < STD_DEDUCTION) {
      return false;
    }
    if (!this.taxpayer.isItemizing && this.taxpayer.deductions !== STD_DEDUCTION) {
      return false;
    }
    return true;
  }
}