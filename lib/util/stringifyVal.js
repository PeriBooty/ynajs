"use strict";

const stringifyError = require("./stringifyError");

module.exports = (key, val) => val instanceof Error ? stringifyError(key, val) : String(val);
