export const taxpayerStd = {
  income: 0,
  deductions: 0,
  isItemizing: false,
  iraContrib: 0,
};

export const taxpayerItem = {
  ...taxpayerStd,
  isItemizing: true,
};