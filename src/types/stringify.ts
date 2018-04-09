import { isString, isNil, isError } from "lightdash";

const stringifyError = (key: string, err: Error): string =>
    `<${key}:${err.message}>`;

const stringifyVal = (val: any, key: string = "unknown"): string => {
    if (isString(val)) return val;
    else if (val === true) return "True";
    else if (val === false) return "False";
    else if (isNil(val)) return "None";
    else if (isError(val)) return stringifyError(key, val);
    else return String(val);
};

export { stringifyError, stringifyVal };
