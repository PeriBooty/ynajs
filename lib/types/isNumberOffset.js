"use strict";

//The spec ONLY allows digits and minus/plus, no binary/hexdec/Infinity etc
const regexNumberOffset = /^[+-]?[0-9]+$/;

/**
 * Checks if YNA-NumberOffset
 * @param {String} str
 * @returns {Boolean}
 */
module.exports = str => regexNumberOffset.test(str);
