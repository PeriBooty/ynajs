"use strict";

const treeControl = require("../language");

/**
 * Converts value to a YNA-List
 * @param {String} str
 * @returns {Array}
 */
module.exports = str => str.split(treeControl.list);
