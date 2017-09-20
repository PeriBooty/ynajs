"use strict";

const moment = require("moment");
const isNumberOffset = require("../../types/isNumberOffset");
const toNumber = require("../../types/toNumber");
const toTime = require("../../types/toTime");

/**
 * time command
 * @param {Array} dataRaw
 * @returns {String}
 */
module.exports = function (dataRaw) {
    const offset = dataRaw[0] ? this.execItem(dataRaw[0]) : "0";
    const format = dataRaw[1] ? this.execItem(dataRaw[1]) : "HH:mm";

    if (!isNumberOffset(offset)) {
        return new Error("invalid offset");
    } else {
        const offsetNumber = toNumber(offset);
        const time = moment(Date.now()).utcOffset(offsetNumber);

        return toTime(time, format);
    }
};
