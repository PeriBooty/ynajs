const REGEX_NUMBER_OFFSET = /^[+-]?[0-9]+$/;

const isNumberOffset = (val: any): boolean =>
    REGEX_NUMBER_OFFSET.test(String(val));

export { isNumberOffset };
