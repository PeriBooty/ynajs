"use strict";

/**
 * Debug logger
 * @param {Array} arr
 * @param {Object} data
 */
module.exports = function (arr, data) {
    if (this.options.debug) {
        const path = [this.name];

        path.push(...arr);

        console.log(path.join("."), "\n", data, "\n");
    }
};
