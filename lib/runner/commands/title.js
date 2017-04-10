"use strict";

module.exports = function (dataRaw) {
    const _this = this;
    const mapTitleCase = function (letter) {
        const isSpace = space.test(letter);
        let result = letter.toLowerCase();
        if (inSpace && !isSpace) {
            inSpace = false;
            result = letter.toUpperCase();
        }

        inSpace = isSpace;

        return result;
    };
    const data = _this.execArrArr(dataRaw);
    const text = data[0];
    const space = /\s/;
    let inSpace = true;

    return text.split("").map(mapTitleCase).join("");
};
