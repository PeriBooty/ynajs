"use strict";

const stringifyError = require("./stringifyError");

/**
 * Converts an value/error to a string
 *
 * @private
 * @param {string} key
 * @param {any} val
 * @returns {string}
 */
module.exports = (key, val) => val instanceof Error ? stringifyError(key, val) : String(val);
