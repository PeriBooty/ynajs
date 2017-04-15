"use strict";

module.exports = function (dataRaw) {
    const _this = this;

    if (dataRaw.length === 0) {
        return new Error("no args");
    } else {
        const data = _this.execArr(dataRaw);
        const text = data[0];

        return text.toLowerCase();
    }
};
