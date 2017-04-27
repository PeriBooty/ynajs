"use strict";

const treeControl = require("../language.json");

/**
 * Converts value to a YNA-List
 * @param {String} str
 * @returns {Array}
 */
module.exports = str => str.split(treeControl.list);
