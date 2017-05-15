"use strict";

module.exports = function (dataRaw) {
    const _this = this;

    if (dataRaw.length === 0) {
        return new Error("no args");
    } else {
        _this.execArr(dataRaw);

        return "";
    }
};
