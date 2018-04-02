"use strict";

const dateFormat = require("pydateformat");

/**
 * Converts a datetime to UTC naive time
 *
 * @private
 * @param {string|Date} time
 * @param {string} format
 * @returns {string}
 */
module.exports = (time, format = "%H:%M") => dateFormat(time, format);
