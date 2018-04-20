const REGEX_ERROR = /^<[a-z]+:[a-z0-9 ]+>$/;

const isError = (str: string): boolean => REGEX_ERROR.test(str);

export { isError };