"use strict";

const textToOneline = require("../util/textToOneline");

module.exports = function (dataRaw) {
    const _this = this;
    const text = _this.execItem(dataRaw[0]);
    const oneline = textToOneline(text);

    return oneline;
};
