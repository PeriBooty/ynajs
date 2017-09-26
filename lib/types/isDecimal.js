"use strict";

//The spec ONLY allows digits and dots, no binary/hexdec/Infinity etc
const regexFloat = /^-?\d+\.?\d*$/;

/**
 * Checks if YNA-Decimal
 *
 * @private
 * @param {string} str
 * @returns {boolean}
 */
module.exports = str => regexFloat.test(str);
