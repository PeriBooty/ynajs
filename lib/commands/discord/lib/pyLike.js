"use strict";

const convertBoolean = bool => bool ? "True" : "False";

const convertVal = val => val !== null ? val : "None";

module.exports = {
    convertBoolean,
    convertVal
};
