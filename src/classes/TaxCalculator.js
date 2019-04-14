import {roundUp, allPosNums, nonNegative} from "../utils";
import {STD_DEDUCTION, TAX_BRACKETS, PERS_EXEMPTION, PE_PHASEOUT} from "../constants";

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

  getExemptionAmt() {
    const adjIncome = this.getAdjIncome();
    if (adjIncome >= PE_PHASEOUT.limit) return 0;
    if (adjIncome <= PE_PHASEOUT.threshold) return PERS_EXEMPTION;
    const phaseOutRange = PE_PHASEOUT.limit - PE_PHASEOUT.threshold;
    const excessIncome = adjIncome - PE_PHASEOUT.threshold;
    const remainingPercent = 1 - (excessIncome / phaseOutRange);
    return roundUp(remainingPercent * PERS_EXEMPTION);
  }

  itemizingLessThanStd() {
    return this.isItemizing && this.deductions < STD_DEDUCTION ? true : false;
  }

  getTaxableIncome() {
    const adjIncome = this.getAdjIncome();
    const persExemptionAmt = this.getExemptionAmt();
    let safeDeduction = this.deductions;
    if (this.itemizingLessThanStd()) safeDeduction = STD_DEDUCTION;
    const taxableIncome = adjIncome - persExemptionAmt - safeDeduction;
    return nonNegative(taxableIncome);
  }

  getTaxBracket() {
    const taxableIncome = this.getTaxableIncome();
    for (let bracket of TAX_BRACKETS) {
      if (taxableIncome >= bracket.threshold) {
        return bracket;
      }
    }
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