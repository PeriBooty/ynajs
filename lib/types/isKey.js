"use strict";

const REGEX_KEY = /^[a-z_][0-9a-z_]*$/i;

/**
 * Checks if YNA-Key
 *
 * @private
 * @param {string} str
 * @returns {boolean}
 */
module.exports = str => REGEX_KEY.test(str);
