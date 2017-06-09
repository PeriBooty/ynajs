"use strict";

const moment = require("moment");
const isNumberOffset = require("../types/isNumberOffset");
const toNumber = require("../types/toNumber");
const toTime = require("../types/toTime");

module.exports = function (dataRaw) {
    const offset = this.execItem(dataRaw[0]);

    if (!isNumberOffset(offset)) {
        return new Error("invalid offset");
    } else {
        const offsetNumber = toNumber(offset);
        const time = moment(Date.now()).utcOffset(offsetNumber);

        return toTime(time);
    }
};
