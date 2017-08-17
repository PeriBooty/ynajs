"use strict";

/**
 * Escapes all newlines in key
 * @param {String} keyVal
 * @returns {String}
 */
module.exports = keyVal => keyVal.replace("\n", "\\\\n");
