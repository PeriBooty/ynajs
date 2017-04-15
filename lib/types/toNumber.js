"use strict";

const isNumber=require("./isNumber");

/**
 * Converts value to a YNA-Number
 * @param {String} str
 * @returns {Number|Boolean}
 */
module.exports = str => isNumber(str) ? Number(str) : false;
