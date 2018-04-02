"use strict";

const LANGUAGE_YNA = require("../language");

/**
 * Converts value to a YNA-List
 *
 * @private
 * @param {string} str
 * @returns {Array<any>}
 */
module.exports = str => str.split(LANGUAGE_YNA.control.data.list);
