const REGEX_FLOAT = /^-?\d+\.\d+$/;

const toDecimal = parseFloat;
const isDecimal = (val: any): boolean => REGEX_FLOAT.test(String(val));

export { toDecimal, isDecimal };
