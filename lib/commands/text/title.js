"use strict";

const SPACE = /\s/;

/**
 * Makes string titlecase
 * @param {String} str
 * @returns {String}
 */
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

/**
 * title command
 * @param {Array} dataRaw
 * @returns {String}
 */
module.exports = function (dataRaw) {
    if (dataRaw.length === 0) {
        return new Error("no content");
    } else {
        const content = this.execItem(dataRaw[0]);

        return toTitleCase(content);
    }
};