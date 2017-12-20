"use strict";

/**
 * Converts an error to a YNA error string
 *
 * @private
 * @param {string} key
 * @param {Error} err
 * @returns {string}
 */
module.exports = (key, err) => `<${key}:${err.message}>`;
