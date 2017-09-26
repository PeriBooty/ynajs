"use strict";

const regexError = /^<.+?:.+?>$/;

/**
 * Checks if YNA-Error
 *
 * @private
 * @param {string} str
 * @returns {boolean}
 */
module.exports = str => regexError.test(str);
