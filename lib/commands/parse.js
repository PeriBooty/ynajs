"use strict";

module.exports = function (dataRaw) {
    const _this = this;

    if (dataRaw.length === 0) {
        return new Error("no args");
    } else {
        const text = _this.execItem(dataRaw[0]);

        return encodeURI(text);
    }
};
