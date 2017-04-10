"use strict";

module.exports = function (dataRaw) {
    const _this = this;
    let key;
    let val;

    if (dataRaw.length === 0) {
        throw new Error("func:no args");
    }
    if (dataRaw.length !== 2) {
        throw new Error("func:invalid args");
    }

    key = _this.execArr([dataRaw[0]])[0]; //Evaluate key directly
    val = () => _this.execArr([dataRaw[1]])[0]; //Evaluate value on fn call

    _this.keys.set(key, val);

    return "";
};
