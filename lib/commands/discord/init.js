"use strict";

module.exports = function (dataRaw) {
    console.log(this.options.plugins.discord);

    return "<NYI>";
    /*if (dataRaw.length === 0) {
        return new Error("no args");
    } else if (dataRaw.length !== 2) {
        return new Error("invalid args");
    } else {
        const data = this.execArr(dataRaw);
        const key = data[0];

        if (!isKey(key)) {
            return new Error("invalid key");
        } else {
            const val = escapeKeyVal(this.transformer(data[1]));

            this.keys.set(key, val);

            return "";
        }
    }*/
};
