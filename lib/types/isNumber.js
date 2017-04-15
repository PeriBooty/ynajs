"use strict";

//The spec ONLY allows digits, no binary/hexdec/Infinity etc
const regexInt = /^[0-9]+$/;

/**
 * Checks if YNA-Number
 * @param {String} str
 * @returns {Boolean}
 */
module.exports = str => regexInt.test(str);
