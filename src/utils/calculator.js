import {roundUp, posNumber} from "./index";
import {TAX_RATE, STD_DEDUCTION} from "../constants";

export class TaxPayer {
  constructor(data) {
    if (!data) throw new Error("null-data");
    const {income, deductions, isItemizing} = data;
    if (!posNumber(income) && !posNumber(deductions) && typeof isItemizing !== "boolean") {
      throw new Error("invalid-data");
    }
    this.income = roundUp(income);
    this.deductions = roundUp(isItemizing ? deductions : STD_DEDUCTION);
    this.isItemizing = isItemizing;
  }
}

export class TaxCalculator {
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