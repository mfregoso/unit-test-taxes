import React, { useState } from "react";
import { preventDecimal, posNumber } from "../utils";
import {STD_DEDUCTION, PE_PHASEOUT} from "../constants";
import TaxCalculator from "../classes/TaxCalculator";

const TaxForm = () => {
  const [income, setIncome] = useState("");
  const [iraContrib, setIraContrib] = useState("");
  const [deductions, setDeductions] = useState(STD_DEDUCTION);
  const [isItemizing, setItemizing] = useState(false);

  const numInputHandler = (callback, e) => {
    const val = e.target.value;
    if (posNumber(val)) {
      callback(val);
    }
  }

  const taxInfo = new TaxCalculator({income, deductions, isItemizing, iraContrib});
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
        onKeyDown={e => preventDecimal(e)}
        className="form-control"
        placeholder="Enter Total Gross Income"
      />
      <br />
      <label className="font-weight-bold">Annual IRA Contributions</label>
      <input
        value={iraContrib}
        onChange={e => numInputHandler(setIraContrib, e)}
        type="number"
        onKeyDown={e => preventDecimal(e)}
        className="form-control"
        placeholder="Enter Annual IRA Contributions"
      />
      <br />
      <label>
        <u className="font-weight-bold">Adjusted Gross Income</u>: ${taxInfo.getAdjIncome().toLocaleString()}
      </label>
      <p />
      <label className="font-weight-bold">Less: Deductions</label>
      <div className="form-check">
        <input
          className="form-check-input"
          type="radio"
          checked={!isItemizing}
          onChange={() => setItemizing(false)}
        />
        <label className="form-check-label">
          Standard Deduction (${STD_DEDUCTION.toLocaleString()})
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
            onKeyDown={e => preventDecimal(e)}
            className="form-control"
            placeholder="Enter Total Itemized Deductions"
          />
        </React.Fragment>
      }
      <br />
      <div><span className="font-weight-bold">Personal Exemption</span> (phased out after ${PE_PHASEOUT.threshold.toLocaleString()} AGI)</div>
      ${taxInfo.getExemptionAmt().toLocaleString()}
      <p />
      <label>
        <u className="font-weight-bold">Taxable Income</u>: ${taxInfo.getTaxableIncome().toLocaleString()}
      </label>
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
