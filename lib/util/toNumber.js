"use strict";

//The spec ONLY allows digits and +/-, no binary/hexdec/Infinity etc
const regexInt = /^[+-]*[0-9]+$/;

/**
 * Converts value to a YNA-Number
 * @param {String} str
 * @returns {Number|Boolean}
 */
module.exports = str => regexInt.test(str) ? Number(str) : false;
