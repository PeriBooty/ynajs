"use strict";

const DOUBLY_ESCAPED_NEWLINE = "\\\\n";
const NEWLINE = "\n";

const replaceAll = require("replace-string");

module.exports = keyVal => replaceAll(keyVal, NEWLINE, DOUBLY_ESCAPED_NEWLINE);
