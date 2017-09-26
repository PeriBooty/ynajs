"use strict";

const REGEX_ERROR = /^<.+?:.+?>$/;

/**
 * Checks if YNA-Error
 *
 * @private
 * @param {string} str
 * @returns {boolean}
 */
module.exports = str => REGEX_ERROR.test(str);
