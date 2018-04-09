const REGEX_NUMBER = /^-?\d+\.?\d*$/;

const toNumber = parseFloat;
const isNumber = (val: any): boolean => REGEX_NUMBER.test(String(val));

export { toNumber, isNumber };
