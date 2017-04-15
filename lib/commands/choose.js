"use strict";

module.exports = function (dataRaw) {
    const _this = this;

    if (dataRaw.length === 0) {
        return new Error("no options");
    } else {
        const data = _this.execArr(dataRaw);
        const index = Math.floor(Math.random() * data.length);

        return data[index];
    }
};
