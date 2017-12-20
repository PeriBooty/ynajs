"use strict";

const stringifyError = require("./stringifyError");
const { convertVal } = require("../types/toPyLike");
const { isString, isError } = require("lightdash");

/**
 * Converts an value/error to a string
 *
 * @private
 * @param {string} key
 * @param {any} val
 * @returns {string}
 */
module.exports = function(key, val) {
    if (isError(val)) {
        return stringifyError(key, val);
    } else {
        const valConverted = convertVal(val);

        return isString(valConverted) ? valConverted : String(valConverted);
    }
};
