import React, { useState } from "react";
import { preventDecimal, posNumber } from "../utils";
import {STD_DEDUCTION, TAX_RATE} from "../constants";
import TaxCalculator from "../classes/TaxCalculator";

const TaxForm = () => {
  const [income, setIncome] = useState("");
  const [deductions, setDeductions] = useState(STD_DEDUCTION);
  const [isItemizing, setItemizing] = useState(false);

  const numInputHandler = (callback, e) => {
    const val = e.target.value;
    if (posNumber(val)) {
      callback(val);
    }
  }

  const taxInfo = new TaxCalculator({income, deductions, isItemizing});
  const mrgRate = Number(taxInfo.getTaxBracket().rate*100).toFixed();

  return (
    <div>
      <h3 className="title">Taxes ({mrgRate}% marginal rate)</h3>
      <p />
      <input
        value={income}
        onChange={e => numInputHandler(setIncome, e)}
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
          checked={!isItemizing}
          onChange={() => setItemizing(false)}
        />
        <label className="form-check-label">
          Standard Deduction ($8,500)
        </label>
      </div>
      <div className="form-check">
        <input
          className="form-check-input"
          type="radio"
          checked={isItemizing}
          onChange={() => setItemizing(true)}
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
            onChange={e => numInputHandler(setDeductions, e)}
            type="number"
            onKeyPress={e => preventDecimal(e)}
            className="form-control"
            placeholder="Enter Total Itemized Deductions"
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
