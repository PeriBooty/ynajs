"use strict";


const treeControl = require("./constants");

/**
 * Parses string into str/command parts
 * @param {String} str
 */
const parseString = function (str) {
    const parseCommand = require("./parseCommand");
    const hasCommands = str.includes(treeControl.open);

    if (!hasCommands) {
        return [str];
    } else {
        const result = [];
        let indexLast = 0;
        let indexNext = 0;
        let stack = 0;

        str.split("").forEach(letter => {
            if (letter === treeControl.open) {
                stack++;

                if (stack === 1) {
                    const partString = str.substr(indexLast, indexNext - indexLast);

                    result.push(partString);
                    indexLast = indexNext;
                }
            }
            if (letter === treeControl.close) {
                stack--;

                if (stack === 0) {
                    const partString = str.substr(indexLast, indexNext - indexLast + 1);
                    const partCommand = parseCommand(partString);

                    result.push(partCommand);
                    indexLast = indexNext + 1;
                }
            }

            indexNext++;
        });
        result.push(str.substr(indexLast, indexNext));

        return result;
    }
};

module.exports = parseString;
