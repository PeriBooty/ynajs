"use strict";

// The spec ONLY allows digits and minus, no binary/hexadecimal/Infinity etc
const REGEX_NUMBER = /^-?\d+\.?\d*$/;

/**
 * Checks if YNA-Number
 *
 * @private
 * @param {string} str
 * @returns {boolean}
 */
module.exports = str => REGEX_NUMBER.test(str);
