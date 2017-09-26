"use strict";

const REGEX_NUMBER_OFFSET = /^[+-]?[0-9]+$/;

/**
 * Checks if YNA-NumberOffset
 *
 * @private
 * @param {string} str
 * @returns {boolean}
 */
module.exports = str => REGEX_NUMBER_OFFSET.test(str);
