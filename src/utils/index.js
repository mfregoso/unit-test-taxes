export const isNumber = input => {
  if (typeof input !== "number" && typeof input !== "string") return false;
  const test = Number(input);
  if (!isNaN(test)) return true;
  return false;
}

export const roundUp = input => {
  if (isNumber(input)) {
    const cleanerNum = Number(input).toFixed(2)
    return Math.ceil(cleanerNum);
  }
  throw new Error("invalid-number");
}

export const preventDecimal = e => {
  if (e.key === ".") e.preventDefault();
}

export const posNumber = input => {
  if (isNumber(input) && input >= 0) return true;
  return false;
}