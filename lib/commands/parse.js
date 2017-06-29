"use strict";

/**
 * parse command
 * @param {Array} dataRaw
 * @returns {String}
 */
module.exports = function (dataRaw) {
    if (dataRaw.length === 0) {
        return new Error("no content");
    } else {
        const quote = this.execItem(dataRaw[0]);

        return encodeURI(quote);
    }
};
