"use strict";

const moment = require("moment");

module.exports = time => moment(time).format("YYYY-MM-DD HH:mm:ss:SSSSSS");
