"use strict";

const moment = require("moment");

/**
 * Converts a datetime to UTC naive datetime
 *
 * @private
 * @param {string|Date} time
 * @returns {string}
 */
module.exports = time => moment(time).format("YYYY-MM-DD HH:mm:ss:SSSSSS");
