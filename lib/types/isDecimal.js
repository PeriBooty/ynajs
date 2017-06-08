"use strict";

//The spec ONLY allows digits and dots, no binary/hexdec/Infinity etc
const regexFloat = /^-?\d+\.?\d*$/;

/**
 * Checks if YNA-Decimal
 * @param {String} str
 * @returns {Boolean}
 */
module.exports = str => regexFloat.test(str);
