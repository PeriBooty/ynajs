"use strict";

/**
 * Creates a Map from an Object
 *
 * @private
 * @param {Object} obj
 * @returns {Map}
 */
module.exports = obj => new Map(Object.entries(obj));
