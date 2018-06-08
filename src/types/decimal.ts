const REGEX_FLOAT = /^-?\d+(?:\.\d+)?$/;

const toDecimal = (val: any): number => parseFloat(String(val).trim());
const isDecimal = (val: any): boolean => REGEX_FLOAT.test(String(val).trim());

export { toDecimal, isDecimal };
