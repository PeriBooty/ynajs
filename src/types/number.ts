const REGEX_NUMBER = /^-?\d+$/;

const toNumber = parseInt;
const isNumber = (val: any): boolean => REGEX_NUMBER.test(String(val));

export { toNumber, isNumber };
