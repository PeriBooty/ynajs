"use strict";

const {
    isNil
} = require("lodash");

/**
 * convert boolean
 *
 * @param {any} val
 * @returns {any}
 */
const convertBoolean = function (val) {
    if (val === true) {
        return "True";
    } else if (val === false) {
        return "False";
    } else {
        return val;
    }
};

/**
 * convert none
 *
 * @param {any} val
 * @returns {any}
 */
const convertNone = val => isNil(val) ? "None" : val;

/**
 * convert val
 *
 * @param {any} val
 * @returns {any}
 */
const convertVal = val => convertBoolean(convertNone(val));

module.exports = {
    convertBoolean,
    convertNone,
    convertVal
};
