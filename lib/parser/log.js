"use strict";

const name = "PARSER";

module.exports = function (arr, data) {
    const _this = this;

    if (_this.debug) {
        const path = [name];

        path.push(...arr);

        console.log(path.join("."), "\n", data, "\n");
    }
};
