"use strict";

const regexError = /^<.*?:.*?>$/;
/**
 * Checks if YNA-Error
 * @param {String} str
 * @returns {Boolean}
 */
module.exports = str => regexError.test(str);
