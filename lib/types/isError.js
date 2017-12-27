"use strict";

const REGEX_ERROR = /^<[a-z]+:[a-z0-9 ]+$/;

/**
 * Checks if YNA-Error
 *
 * @private
 * @param {string} str
 * @returns {boolean}
 */
module.exports = str => REGEX_ERROR.test(str);
