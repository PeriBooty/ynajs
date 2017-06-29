"use strict";

/**
 * len command
 * @param {Array} dataRaw
 * @returns {String}
 */
module.exports = function (dataRaw) {
    if (dataRaw.length === 0) {
        return new Error("no content");
    } else {
        const content = this.execItem(dataRaw[0]);

        return content.length;
    }
};
