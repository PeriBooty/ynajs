"use strict";

const moment = require("moment");

/**
 * Converts a datetime to UTC naive datetime
 * @param {String|Date} time
 * @returns {String}
 */
module.exports = time => moment(time).utc().format("YYYY-MM-DD HH:mm:ss:SSSSSS");
