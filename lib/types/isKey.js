"use strict";

const regexKey = /^[a-z_][0-9a-z_]*$/i;

/**
 * Checks if YNA-Key
 *
 * @private
 * @param {string} str
 * @returns {boolean}
 */
module.exports = str => regexKey.test(str);
