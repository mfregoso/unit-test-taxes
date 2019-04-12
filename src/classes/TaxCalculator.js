import {roundUp, posNumber} from "../utils";
import {TAX_RATE, STD_DEDUCTION} from "../constants";

export default class TaxCalculator {
  constructor(taxData) {
    if (!taxData) throw new Error("null-data");
    const {income, deductions, isItemizing} = taxData;
    if (!posNumber(income) && !posNumber(deductions) && typeof isItemizing !== "boolean") {
      throw new Error("invalid-data");
    }
    
    this.income = roundUp(income);
    this.deductions = roundUp(isItemizing ? deductions : STD_DEDUCTION);
    this.isItemizing = isItemizing;
    this.taxLiability = 0;
  }

  getAdjIncome() {
    const adjIncome = this.income - this.deductions;
    return adjIncome < 0 ? 0: adjIncome;
  }

  getTaxLiability() {
    const taxableIncome = this.getAdjIncome();
    const taxLiability = taxableIncome * TAX_RATE;
    return roundUp(taxLiability);
  }

  validate() {
    if (this.isItemizing && this.deductions < STD_DEDUCTION) {
      return false;
    }
    if (!this.isItemizing && this.deductions !== STD_DEDUCTION) {
      return false;
    }
    return true;
  }
}