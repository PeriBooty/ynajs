"use strict";

const stringifyError = require("./stringifyError");
const {
    convertVal
} = require("../types/toPyLike");
const {
    isString,
} = require("lightdash");

/**
 * Converts an value/error to a string
 *
 * @private
 * @param {string} key
 * @param {any} val
 * @returns {string}
 */
module.exports = function (key, val) {
    if (val instanceof Error) {
        return stringifyError(key, val);
    } else {
        const valPyLike = convertVal(val);

        return isString(valPyLike) ? valPyLike : String(valPyLike);
    }
};
