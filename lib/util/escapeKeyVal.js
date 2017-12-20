"use strict";

/**
 * Escapes all newlines in a key
 *
 * @param {string} keyVal
 * @returns {string}
 */
module.exports = keyVal => keyVal.replace("\n", "\\\\n");
