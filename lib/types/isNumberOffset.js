"use strict";

const regexNumberOffset = /^[+-]?[0-9]+$/;

/**
 * Checks if YNA-NumberOffset
 *
 * @private
 * @param {string} str
 * @returns {boolean}
 */
module.exports = str => regexNumberOffset.test(str);
