"use strict";

//The spec ONLY allows digits and dots, no binary/hexadecimal/Infinity etc
const REGEX_FLOAT = /^-?\d+\.\d+$/;

/**
 * Checks if YNA-Decimal
 *
 * @private
 * @param {string} str
 * @returns {boolean}
 */
module.exports = str => REGEX_FLOAT.test(str);
