"use strict";

const LANGUAGE_YNA = require("../language");

/**
 * Checks if YNA-List
 *
 * @private
 * @param {string} str
 * @returns {boolean}
 */
module.exports = str => str.includes(LANGUAGE_YNA.control.data.list);
