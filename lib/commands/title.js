"use strict";

const SPACE = /\s/;

module.exports = function (dataRaw) {
    if (dataRaw.length === 0) {
        return new Error("no args");
    } else {
        const text = this.execItem(dataRaw[0]);
        let inSpace = true;

        return text.split("").map(letter => {
            const isSpace = SPACE.test(letter);
            let result = letter.toLowerCase();
            if (inSpace && !isSpace) {
                inSpace = false;
                result = letter.toUpperCase();
            }

            inSpace = isSpace;

            return result;
        }).join("");
    }
};
