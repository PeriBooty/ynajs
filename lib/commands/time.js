"use strict";

const moment = require("moment");
const isNumberOffset = require("../types/isNumberOffset");
const toNumber = require("../types/toNumber");
const toDatetime = require("../types/toDatetime");

module.exports = function (dataRaw) {
    if (dataRaw.length === 0) {
        return new Error("no args");
    } else {
        const offset = this.execItem(dataRaw[0]);

        if (!isNumberOffset(offset)) {
            return new Error("invalid offset");
        } else {
            const offsetNumber = toNumber(offset);
            const time = moment(Date.now()).utcOffset(offsetNumber);

            return toDatetime(time);
        }
    }
};
