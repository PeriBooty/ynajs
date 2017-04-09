"use strict";

module.exports = function (dataRaw, exec, keys, commands) {
    const data = exec(dataRaw, keys, commands);
    const text = data[0];

    return text.toLowerCase();
};
