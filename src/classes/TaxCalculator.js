import {roundUp, allPosNums, nonNegative} from "../utils";
import {STD_DEDUCTION, TAX_BRACKETS} from "../constants";

export default class TaxCalculator {
  constructor(taxData) {
    if (!taxData) throw new Error("null-data");
    const {income, deductions, isItemizing, iraContrib} = taxData;
    if (!allPosNums([income, deductions, iraContrib]) || typeof isItemizing !== "boolean") {
      throw new Error("invalid-data");
    }
    
    this.income = roundUp(income);
    this.iraContrib = roundUp(iraContrib);
    this.deductions = roundUp(isItemizing ? deductions : STD_DEDUCTION);
    this.isItemizing = isItemizing;
    this.taxLiability = 0;
  }

  getAdjIncome() {
    const adjIncome = this.income - this.iraContrib;
    return nonNegative(adjIncome);
  }

  getTaxableIncome() {
    const adjIncome = this.getAdjIncome();
    const persExemptions = 0; //TODO?
    const taxableIncome = adjIncome - persExemptions - this.deductions;
    return nonNegative(taxableIncome);
  }

  getTaxBracket() {
    const taxableIncome = this.getTaxableIncome();
    const lowestBracket = TAX_BRACKETS.slice(-1)[0];
    for (let bracket of TAX_BRACKETS) {
      if (taxableIncome >= bracket.threshold) {
        return bracket;
      }
    }
    return lowestBracket;
  }
  
  getTaxLiability() {
    const taxableIncome = this.getTaxableIncome();
    const taxBracket = this.getTaxBracket();
    const mrgIncome = taxableIncome - taxBracket.threshold;
    const taxLiability = mrgIncome * taxBracket.rate + taxBracket.baseTax;
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