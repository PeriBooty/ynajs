"use strict";

const isKey = require("../types/isKey");
const escapeKeyVal = require("./lib/escapeKeyVal");

module.exports = function (dataRaw) {
    const _this = this;

    if (dataRaw.length === 0) {
        return new Error("no args");
    } else if (dataRaw.length !== 2) {
        return new Error("invalid args");
    } else {
        const data = _this.execArr(dataRaw);
        const key = data[0];

        if (!isKey(key)) {
            return new Error("invalid key");
        } else {
            const val = escapeKeyVal(_this.transformer(data[1]));

            _this.keys.set(key, val);

            return "";
        }
    }
};
