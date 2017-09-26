"use strict";

/**
 * Converts an error to a string
 *
 * @private
 * @param {string} key
 * @param {Error} err
 * @returns {string}
 */
module.exports = (key, err) => `<${key}:${err.message}>`;
