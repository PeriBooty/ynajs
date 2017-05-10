"use strict";

const LANGUAGE_YNA = require("../language");

/**
 * Converts value to a YNA-List
 * @param {String} str
 * @returns {Array}
 */
module.exports = str => str.split(LANGUAGE_YNA.control.data.list);
