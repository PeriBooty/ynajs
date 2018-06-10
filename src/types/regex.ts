const escapeRegex = (str: string): string =>
    str.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");

const getRegex = (str: string): string => str.substr(1, str.length - 2);

const isRegex = (str: string): boolean =>
    str.length > 2 && str.startsWith("/") && str.endsWith("/");

const isRegexValid = (str: string): boolean => {
    let result = true;

    try {
        // tslint:disable:no-unused-expression
        new RegExp(getRegex(str));
    } catch (e) {
        result = false;
    }

    return result;
};

const toRegex = (str: string): RegExp => new RegExp(getRegex(str));

export { toRegex, isRegex, isRegexValid, getRegex, escapeRegex };
