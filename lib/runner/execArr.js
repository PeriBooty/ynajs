"use strict";

module.exports = function (arr) {
    const _this = this;

    return arr.map(item => _this.execItem(item));
};
