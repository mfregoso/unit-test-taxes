import {roundUp} from "../utils";

export const STD_DEDUCTION = 12500;
export const IRA_MAX = 5500;
export const PERS_EXEMPTION = 4000;
export const PE_PHASEOUT = {threshold: 260000, limit: 384000};

export const MRG_RATE_1 = 0.15;
export const INC_THRES_1 = 0;
export const BASE_TAX_1 = 0;

export const MRG_RATE_2 = 0.20;
export const INC_THRES_2 = 60000;
export const BASE_TAX_2 = roundUp(MRG_RATE_1 * INC_THRES_2 + BASE_TAX_1); // 9,000

export const MRG_RATE_3 = 0.28;
export const INC_THRES_3 = 150000;
export const BASE_TAX_3 = roundUp(MRG_RATE_2 * (INC_THRES_3 - INC_THRES_2) + BASE_TAX_2); // 27,000

export const MRG_RATE_4 = 0.35;
export const INC_THRES_4 = 500000;
export const BASE_TAX_4 = roundUp(MRG_RATE_3 * (INC_THRES_4 - INC_THRES_3) + BASE_TAX_3); // 125,000

export const TAX_BRACKETS = [
  {
    rate: MRG_RATE_4,
    threshold: INC_THRES_4,
    baseTax: BASE_TAX_4,
    id: 4,
  },
  {
    rate: MRG_RATE_3,
    threshold: INC_THRES_3,
    baseTax: BASE_TAX_3,
    id: 3,
  },
  {
    rate: MRG_RATE_2,
    threshold: INC_THRES_2,
    baseTax: BASE_TAX_2,
    id: 2,
  },
  {
    rate: MRG_RATE_1,
    threshold: INC_THRES_1,
    baseTax: BASE_TAX_1,
    id: 1,
  },
];

export const FORM_MSGS = {
  isValid: true,
  ira: {
    showMsg: false,
    msg: `IRA contributions deduction is limited to $${IRA_MAX.toLocaleString()}`
  },
  itemized: {
    showMsg: false,
    msg: `Itemized deductions must be at least $${STD_DEDUCTION.toLocaleString()}`
  },
  exemption: {
    showMsg: false,
    msg: `phased out after $${PE_PHASEOUT.threshold.toLocaleString()} AGI`
  },
};
