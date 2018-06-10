declare const escapeRegex: (str: string) => string;
declare const getRegex: (str: string) => string;
declare const isRegex: (str: string) => boolean;
declare const isRegexValid: (str: string) => boolean;
declare const toRegex: (str: string) => RegExp;
export { toRegex, isRegex, isRegexValid, getRegex, escapeRegex };
