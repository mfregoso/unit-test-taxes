import {roundUp, posNumber} from "../utils";
import {STD_DEDUCTION} from "../constants";

export default class TaxPayer {
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