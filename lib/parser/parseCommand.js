"use strict";

const treeControl = require("./constants");

/**
 * parses command-string into command object
 * @param {String} str
 */
module.exports = function (strFull) {
    const result = {
        type: null,
        data: []
    };
    const str = strFull.substring(1, strFull.length - 1);
    const contentIndex = str.indexOf(treeControl.content);

    console.log(str, contentIndex);

    if (contentIndex !== -1) {
        const strData = str.substr(contentIndex + 1);
        const data = [];
        let indexLast = 0;
        let indexNext = 0;
        let stack = 0;

        strData.split("").forEach(letter => {
            if (letter === treeControl.open) {
                stack++;
            }
            if (letter === treeControl.close) {
                stack--;
            }
            if (letter === treeControl.delemiter && stack === 0) {

                data.push(strData.substr(indexLast, indexNext - indexLast));
                indexLast = indexNext + 1;
            }

            indexNext++;
        });

        result.type = str.substring(0, contentIndex);
        result.data = data;
    } else {
        result.type = str;
    }

    return result;
};
