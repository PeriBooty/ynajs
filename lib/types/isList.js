"use strict";

const LANGUAGE_YNA = require("../language");

/**
 * Checks if YNA-List
 * @param {String} str
 * @returns {Boolean}
 */
module.exports = str => str.includes(LANGUAGE_YNA.control.data.list);
