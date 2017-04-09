"use strict";

const treeControl = require("./constants");
const parseString = require("./parseString");

module.exports = function (str, contentIndex) {
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
        if (letter === treeControl.delimiter && stack === 0) {
            const partString = strData.substr(indexLast, indexNext - indexLast).trim();

            if (partString.includes(treeControl.open)) { //Commands
                //console.log("COMMAND:MIXED", [partString]);
                const partStringArr = parseString(partString);

                data.push(partStringArr);
            } else { //Text
                //console.log("COMMAND:TEXT", [partString]);
                data.push(partString);
            }

            indexLast = indexNext + 1;
        }

        indexNext++;
    });

    return data;
};
