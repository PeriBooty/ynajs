"use strict";

//The spec ONLY allows digits and +/-, no binary/hexdec/Infinity etc
const regexInt = /^[+-]*[0-9]+$/;

module.exports = str => regexInt.test(str) ? Number(str) : false;
