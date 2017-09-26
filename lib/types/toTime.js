"use strict";

const moment = require("moment");

/**
 * Converts a datetime to UTC naive time
 *
 * @private
 * @param {string|Date} time
 * @returns {string}
 */
module.exports = (time, format = "HH:mm") => moment(time).format(format);
