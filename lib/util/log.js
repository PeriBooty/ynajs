"use strict";

/* eslint no-console: "off" */

/**
 * Debug logger
 *
 * @private
 * @param {Array<string>} arr
 * @param {Object} data
 */
module.exports = function (arr, data) {
    if (this.options.debug) {
        const path = [this.name];

        path.push(...arr);

        console.log(path.join("."), "\n", data, "\n");
    }
};
