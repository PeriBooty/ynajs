"use strict";

/**
 * Checks if every value of the array has the given type
 * @param {Array} arr
 * @param {String} type
 * @returns {Boolean}
 */
module.exports = (arr, type) => arr.every(item => typeof item === type);
