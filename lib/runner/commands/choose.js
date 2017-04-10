"use strict";

module.exports = function (dataRaw) {
    const _this = this;
    const data = _this.execArr(dataRaw);
    let index;

    if (data.length === 0) {
        throw new Error("choose:no options");
    }

    index = Math.floor(Math.random() * data.length);

    return data[index];
};
