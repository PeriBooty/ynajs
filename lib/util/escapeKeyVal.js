"use strict";

/**
 * Escapes all newlines in key
 *
 * @param {string} keyVal
 * @returns {string}
 */
module.exports = keyVal => keyVal.replace("\n", "\\\\n");
