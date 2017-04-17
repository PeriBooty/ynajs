"use strict";

/**
 * Checks if YNA-Error
 * @param {String} str
 * @returns {Boolean}
 */
module.exports = str => str.startsWith("<") && str.endsWith(">");
