"use strict";

module.exports = function (dataRaw) {
    const _this = this;
    const data = _this.execArr(dataRaw);
    const text = data[0];

    return text.toUpperCase();
};
