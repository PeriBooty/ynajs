"use strict";

const treeControl = require("../language");

/**
 * Checks if YNA-List
 * @param {String} str
 * @returns {Boolean}
 */
module.exports = str => str.includes(treeControl.list);
