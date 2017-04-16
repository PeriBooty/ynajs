"use strict";

const moment = require("moment");
const isNumber = require("../types/isNumber");
const toNumber = require("../types/toNumber");
const toDatetime = require("../types/toDatetime");

module.exports = function (dataRaw) {
    const _this = this;

    if (dataRaw.length === 0) {
        return new Error("no args");
    } else {
        const data = _this.execArr(dataRaw);

        if (!isNumber(data[0].substr(1))) {
            return new Error("invalid offset");
        } else {
            const offset = toNumber(data[0]);
            const time = moment(Date.now()).utcOffset(offset);

            return toDatetime(time);
        }
    }
};
