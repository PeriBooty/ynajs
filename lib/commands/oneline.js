"use strict";

const transformerOneline = require("../util/transformerOneline");

module.exports = function (dataRaw) {
    const _this = this;
    const text = _this.execItem(dataRaw[0]);
    const oneline = transformerOneline(text);

    return oneline;
};
