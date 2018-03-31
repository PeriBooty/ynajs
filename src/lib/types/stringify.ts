"use strict";

const { isNil, isError, isString } = require("lightdash");

/**
 * Converts an error to a YNA error string
 *
 * @private
 * @param {Error} err
 * @param {string} key
 * @returns {string}
 */
const stringifyError = (key, err) => `<${key}:${err.message}>`;

/**
 * convert val
 *
 * @param {any} val
 * @param {string} [key="unknown"]
 * @returns {string}
 */
const stringifyVal = (val, key = "unknown") => {
    if (isString(val)) return val;
    else if (isError(val)) return stringifyError(key, val);
    else if (isNil(val)) return "None";
    else if (val === true) return "True";
    else if (val === false) return "False";
    else return String(val);
};

module.exports = {
    stringifyError,
    stringifyVal
};
