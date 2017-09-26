"use strict";

const {
    isNil
} = require("lodash");

/**
 * convert boolean
 *
 * @param {boolean} bool
 * @returns {string}
 */
const convertBoolean = bool => bool ? "True" : "False";

/**
 * convert val
 *
 * @param {any} val
 * @returns {string}
 */
const convertVal = val => isNil(val) ? "None" : val;

module.exports = {
    convertBoolean,
    convertVal
};
