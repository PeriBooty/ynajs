"use strict";

const moment = require("moment/moment");
const isNumberOffset = require("../../types/isNumberOffset");
const toNumber = require("../../types/toNumber");
const toTime = require("../../types/toTime");

/**
 * time command
 *
 * @param {Array<any>} dataRaw
 * @returns {string}
 */
module.exports = function(dataRaw) {
    const offset = dataRaw[0] ? this.execItem(dataRaw[0]) : "0";

    if (!isNumberOffset(offset)) {
        return new Error("invalid offset");
    }

    const offsetNumber = toNumber(offset);
    const format = dataRaw[1] ? this.execItem(dataRaw[1]) : "%H:%M";
    const time = moment(Date.now()).utcOffset(offsetNumber);

    return toTime(time, format);
};
