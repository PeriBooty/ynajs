"use strict";

const treeControl = require("../language.json");

/**
 * Checks if YNA-List
 * @param {String} str
 * @returns {Boolean}
 */
module.exports = str => str.includes(treeControl.list);
