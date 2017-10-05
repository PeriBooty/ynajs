"use strict";
/**
 * void command
 *
 * @param {Array<any>} dataRaw
 * @returns {string}
 */
module.exports = function (dataRaw) {
    this.execItem(dataRaw[0]);

    return "";
};
