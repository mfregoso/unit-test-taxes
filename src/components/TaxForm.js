import React, { useState } from "react";
import { preventDecimal, posNumber } from "../utils";
import {STD_DEDUCTION, TAX_RATE} from "../constants";
import taxCalculator, {TaxPayer, TaxCalculator} from "../utils/calculator";

const TaxForm = () => {
  const [income, setIncome] = useState("");
  const [deductions, setDeductions] = useState(STD_DEDUCTION);
  const [isItemizing, setItemizing] = useState(false);

  const deductOptionHandler = (isItemizing) => {
    if (!isItemizing) setDeductions(STD_DEDUCTION);
    setItemizing(isItemizing);
  }

  const numInputHandler = (callback, value) => {
    if (posNumber(value)) {
      callback(value);
    }
  }

  const taxpayer = new TaxPayer({income, deductions, isItemizing});
  const taxInfo = new TaxCalculator(taxpayer);

  return (
    <div>
      <h3 className="title">Taxes ({TAX_RATE*100}% flat rate)</h3>
      <p />
      <input
        value={income}
        onChange={e => numInputHandler(setIncome, e.target.value)}
        type="number"
        onKeyPress={e => preventDecimal(e)}
        className="form-control"
        placeholder="Enter Income"
      />
      <br />
      <div className="form-check">
        <input
          className="form-check-input"
          type="radio"
          name="deductions"
          value="standard"
          checked={!isItemizing}
          onChange={() => deductOptionHandler(false)}
        />
        <label className="form-check-label">
          Standard Deduction ($8,500)
        </label>
      </div>
      <div className="form-check">
        <input
          className="form-check-input"
          type="radio"
          name="deductions"
          value="itemized"
          checked={isItemizing}
          onChange={() => deductOptionHandler(true)}
        />
        <label className="form-check-label">
          Itemized Deductions
        </label>
      </div>
      {isItemizing &&
        <React.Fragment>
          <br />
          <input
            value={deductions}
            onChange={e => numInputHandler(setDeductions, e.target.value)}
            type="number"
            onKeyPress={e => preventDecimal(e)}
            className="form-control"
            placeholder="Enter Total Itemized Deductions"
            disabled={!isItemizing}
          />
        </React.Fragment>
      }
      <br />
      <h3>Tax: ${taxInfo.getTaxLiability().toLocaleString()}</h3>
      <br />
      <button className="btn btn-success" onClick={() => alert(taxInfo.validate())}>
        Validate Form
      </button>
    </div>
  );
};

export default TaxForm;
