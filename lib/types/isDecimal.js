"use strict";

//The spec ONLY allows digits and dots, no binary/hexdec/Infinity etc
const regexFloat = /^-{0,1}[0-9]+\.{0,1}[0-9]*$/;

/**
 * Checks if YNA-Decimal
 * @param {String} str
 * @returns {Boolean}
 */
module.exports = str => regexFloat.test(str);
