"use strict";

const moment = require("moment");

module.exports = dateString => moment(dateString).format("YYYY-MM-DD HH:mm:ss:SSSSSS");
