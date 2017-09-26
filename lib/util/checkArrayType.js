"use strict";

/**
 * Checks if every value of the array has the given type
 *
 * @private
 * @param {Array<any>} arr
 * @param {string} type
 * @returns {boolean}
 */
module.exports = (arr, type) => arr.every(item => typeof item === type);
