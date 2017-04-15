"use strict";

const stringifyError = require("./stringifyError");

/**
 * Converts an value/error to a string
 * @param {String} key
 * @param {Mixed} val
 * @returns {String}
 */
module.exports = (key, val) => val instanceof Error ? stringifyError(key, val) : String(val);
