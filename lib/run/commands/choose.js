"use strict";

module.exports = function (dataRaw, exec, keys, commands) {
    const data = exec(dataRaw, keys, commands);
    let index;

    if (data.length === 0) {
        throw new Error("choose:no options");
    }

    index = Math.floor(Math.random() * data.length);

    return data[index];
};
