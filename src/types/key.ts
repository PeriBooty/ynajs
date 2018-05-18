const REGEX_KEY = /^[a-z_][0-9a-z_]*$/i;

const isKey = (str: string): boolean => REGEX_KEY.test(str);

export { isKey };
