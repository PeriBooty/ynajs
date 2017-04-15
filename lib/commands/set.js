"use strict";

module.exports = function (dataRaw) {
    const _this = this;

    if (dataRaw.length === 0) {
        return new Error("no args");
    } else if (dataRaw.length !== 2) {
        return new Error("invalid args");
    } else {
        const data = _this.execArr(dataRaw);
        const key = data[0];
        const val = data[1];

        _this.keys.set(key, val);

        return "";
    }
};
