"use strict";

module.exports = function (dataRaw) {
    if (dataRaw.length === 0) {
        return new Error("no content");
    } else {
        const text = this.execItem(dataRaw[0]);

        return text.toLowerCase();
    }
};
