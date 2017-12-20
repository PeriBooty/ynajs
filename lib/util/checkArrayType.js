"use strict";

const { isTypeOf } = require("lightdash");

/**
 * Checks if every value of the array has the given type
 *
 * @private
 * @param {Array<any>} arr
 * @param {string} type
 * @returns {boolean}
 */
module.exports = (arr, type) => arr.every(item => isTypeOf(item, type));
