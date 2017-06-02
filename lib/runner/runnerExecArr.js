"use strict";

/**
 * Runs exec over every array element
 * @param {Array} arr
 * @returns {Array}
 */
module.exports = function (arr) {
    const result = arr.map(item => this.execItem(item));

    this.log(["array"], result);

    return result;
};
