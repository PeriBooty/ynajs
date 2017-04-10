"use strict";

module.exports = function (dataRaw) {
    const _this = this;
    let data;
    let key;
    let val;

    if (dataRaw.length === 0) {
        throw new Error("set:no args");
    }
    if (dataRaw.length !== 2) {
        throw new Error("set:invalid args");
    }

    data = _this.execArr(dataRaw);
    key = data[0];
    val = data[1];

    _this.keys.set(key, val);

    return "";
};
