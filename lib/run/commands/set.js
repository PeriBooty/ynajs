"use strict";

module.exports = function (dataRaw, exec, keys, commands) {
    const data = exec(dataRaw, keys, commands);
    const key = data[0];
    const val = data[1];

    keys.set(key, val);

    return "";
};
