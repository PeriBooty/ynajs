"use strict";

module.exports = function (dataRaw) {
    const _this = this;

    if (dataRaw.length === 0) {
        return new Error("no args");
    } else if (dataRaw.length !== 2) {
        return new Error("invalid args");
    } else {
        const key = _this.execItem(dataRaw[0]); //Evaluate key directly
        const val = () => _this.execItem(dataRaw[1]); //Evaluate value on fn call

        _this.keys.set(key, val);

        return "";
    }
};
