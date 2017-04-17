"use strict";

const random = require("lodash/random");

module.exports = function (dataRaw) {
    const _this = this;

    if (dataRaw.length === 0) {
        return new Error("no options");
    } else {
        const data = _this.execArr(dataRaw);
        const index = random(0,  data.length - 1);

        return data[index];
    }
};
