"use strict";

/**
 * Runs exec over every array element
 *
 * @param {Array<any>} arr
 * @returns {Array<string>}
 */
module.exports = function (arr) {
    const result = arr.map(item => this.execItem(item));

    this.log(["array"], result);

    return result;
};
