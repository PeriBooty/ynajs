"use strict";

/**
 * Converts an error to a string
 * @param {String} key
 * @param {Error} err
 * @returns {String}
 */
module.exports  = (key, err) => `<${key}:${err.message}>`;
