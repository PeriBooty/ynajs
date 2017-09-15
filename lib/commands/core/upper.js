"use strict";

/**
 * upper command
 * @param {Array} dataRaw
 * @returns {String}
 */
module.exports = function (dataRaw) {
    if (dataRaw.length === 0) {
        return new Error("no args");
    } else {
        const content = this.execItem(dataRaw[0]);

        return content.toUpperCase();
    }
};