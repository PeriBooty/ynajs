const REGEX_NUMBER = /^-?\d+$/;

const toNumber = (val: any): number => parseInt(String(val).trim(), 10);
const isNumber = (val: any): boolean => REGEX_NUMBER.test(String(val).trim());

export { toNumber, isNumber };
