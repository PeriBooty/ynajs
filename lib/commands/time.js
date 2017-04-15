"use strict";

const moment = require("moment");
const toNumber = require("../util/toNumber");
const toDatetime = require("../util/toDatetime");

module.exports = function (dataRaw) {
    const _this = this;

    if (dataRaw.length === 0) {
        return new Error("no args");
    } else {
        const data = _this.execArr(dataRaw);
        const offset = toNumber(data[0]);

        if (offset === false) {
            return new Error("invalid offset");
        } else {
            const time = moment(Date.now()).utcOffset(offset);

            return toDatetime(time);
        }
    }
};
