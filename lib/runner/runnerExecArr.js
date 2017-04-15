"use strict";

/**
 * Runs exec over every array element
 * @param {Array} arr
 * @returns {Array}
 */
module.exports = function (arr) {
    const _this = this;
    const result = arr.map(item => _this.execItem(item));

    _this.log(["array"], result);

    return result;
};
