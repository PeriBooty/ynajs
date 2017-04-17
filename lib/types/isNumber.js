"use strict";

//The spec ONLY allows digits and minus, no binary/hexdec/Infinity etc
const regexNumber = /^-*[0-9]+$/;

/**
 * Checks if YNA-Number
 * @param {String} str
 * @returns {Boolean}
 */
module.exports = str => regexNumber.test(str);
