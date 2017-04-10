"use strict";

module.exports = function (dataRaw, exec, keys, commands) {
    let data;
    let key;
    let val;

    if (dataRaw.length === 0) {
        throw new Error("set:no args");
    }
    if (dataRaw.length !== 2) {
        throw new Error("set:invalid args");
    }

    data = exec(dataRaw, keys, commands);
    key = data[0];
    val = data[1];

    keys.set(key, val);

    return "";
};
