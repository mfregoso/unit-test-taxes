import React, { useState } from "react";
import { preventDecimal, posNumber } from "../utils";
import {STD_DEDUCTION} from "../constants";
import TaxCalculator from "../classes/TaxCalculator";

const TaxForm = () => {
  const [income, setIncome] = useState(0);
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
    <div className="mx-auto col-xl-5 col-lg-5 col-md-6 col-sm-12 col-xs-12" style={{paddingTop: "2em"}}>
      <div className="text-center">
        <h2>EZ Tax Calculator</h2>
        <h5>Current marginal rate: {mrgRate}%</h5>
      </div>
      <p />
      <label className="font-weight-bold">Total Gross Income</label>
      <input
        value={income}
        onChange={e => numInputHandler(setIncome, e)}
        type="number"
        onKeyPress={e => preventDecimal(e)}
        className="form-control"
        placeholder="Enter Total Gross Income"
      />
      <br />
      <label className="font-weight-bold">Select a Deduction</label>
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
      <div className="tax-breakdown-table">
        <span className="font-weight-bold">Tax Breakdown</span>
        <div className="row">
          <div className="col">
            Adjusted Gross Income
          </div>
          <div className="col">
            ${taxInfo.getAdjIncome().toLocaleString()}
          </div>
        </div>
        <div className="row">
          <div className="col">
            <span className="font-italic">Less Personal Exemptions</span>:
          </div>
          <div className="col">
            $0 (not implemented)
          </div>
        </div>
        <div className="row">
          <div className="col">
            Taxable Income:
          </div>
          <div className="col">
            ${taxInfo.getTaxableIncome().toLocaleString()}
          </div>
        </div>
      </div>
      <p/>
      <h3>Tax: ${taxInfo.getTaxLiability().toLocaleString()}</h3>
      <br />
      <button className="btn btn-success" onClick={() => alert(taxInfo.validate())}>
        Validate Form
      </button>
    </div>
  );
};

export default TaxForm;
