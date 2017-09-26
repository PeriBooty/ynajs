"use strict";

//The spec ONLY allows digits and minus, no binary/hexdec/Infinity etc
const regexNumber = /^-?\d+$/;

/**
 * Checks if YNA-Number
 *
 * @private
 * @param {string} str
 * @returns {boolean}
 */
module.exports = str => regexNumber.test(str);
