"use strict";

module.exports = function (arr, data) {
    const _this = this;

    if (_this.options.debug) {
        const path = [_this.name];

        path.push(...arr);

        console.log(path.join("."), "\n", data, "\n");
    }
};