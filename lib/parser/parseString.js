"use strict";

const treeControl = require("./constants");

/**
 * Parses string into strings/commands array
 * @param {String} str
 * @returns {Array}
 */
const parseString = function (str) {
    const parseCommand = require("./parseCommand");

    if (!str.includes(treeControl.open)) {//Exit early if no command is opened
        return [str];
    } else {
        const result = [];
        let indexLast = 0;
        let indexNext = 0;
        let stack = 0;

        str.split("").forEach(letter => {
            if (letter === treeControl.open) {
                stack++;

                if (stack === 1) { //On start-tag
                    const partString = str.substr(indexLast, indexNext - indexLast);
                    //console.log("STRING:OPEN", [partString]);

                    result.push(partString);
                    indexLast = indexNext;
                }
            }
            if (letter === treeControl.close) { //On end-tag
                stack--;

                if (stack === 0) {
                    const partString = str.substr(indexLast, indexNext - indexLast + 1);
                    //console.log("STRING:CLOSE", [partString]);
                    const partCommand = parseCommand(partString);

                    result.push(partCommand);
                    indexLast = indexNext + 1;
                }
            }

            indexNext++;
        });
        result.push(str.substr(indexLast, indexNext));

        return result.filter(item => item !== ""); //remove empty strings
    }
};

module.exports = parseString;
