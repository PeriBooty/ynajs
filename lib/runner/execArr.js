"use strict";

module.exports = function (arr) {
    const _this = this;
    const result = arr.map(item => _this.execItem(item));

    return result;
};
