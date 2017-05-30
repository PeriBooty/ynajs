"use strict";

const regexKey =/^[a-z_][0-9a-z_]*$/i;

/**
 * Checks if YNA-Key
 * @param {String} str
 * @returns {Boolean}
 */
module.exports = str => regexKey.test(str);
