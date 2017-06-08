"use strict";

const SPACE = /\s/;

const toTitleCase = function (str) {
    let inSpace = true;

    return str
        .split("")
        .map(letter => {
            const isSpace = SPACE.test(letter);
            let result = letter.toLowerCase();
            if (inSpace && !isSpace) {
                inSpace = false;
                result = letter.toUpperCase();
            }

            inSpace = isSpace;

            return result;
        })
        .join("");
};

module.exports = function (dataRaw) {
    if (dataRaw.length === 0) {
        return new Error("no content");
    } else {
        const str = this.execItem(dataRaw[0]);

        return toTitleCase(str);
    }
};
