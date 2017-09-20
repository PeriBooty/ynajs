"use strict";

const moment = require("moment");

/**
 * Converts a datetime to UTC naive time
 * @param {String|Date} time
 * @returns {String}
 */
module.exports = (time, format = "HH:mm") => moment(time).format(format);
