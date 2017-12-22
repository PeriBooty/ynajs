"use strict";

/**
 * len command
 *
 * @param {Array<any>} dataRaw
 * @returns {string}
 */
module.exports = function(dataRaw) {
    if (dataRaw.length === 0) {
        return new Error("no content");
    }

    const content = this.execItem(dataRaw[0]);

    return content.length;
};
