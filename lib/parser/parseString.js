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

                if (stack === 1) { //On start-tag
                    const partString = str.substr(indexLast, indexNext - indexLast);
                    console.log("STRING:OPEN", partString);
                    if (partString) {

                        result.push(partString);
                    }
                    indexLast = indexNext;
                }
            }
            if (letter === treeControl.close) { //On end-tag
                stack--;

                if (stack === 0) {
                    const partString = str.substr(indexLast, indexNext - indexLast + 1);
                    console.log("STRING:CLOSE", partString);
                    const partCommand = parseCommand(partString);

                    if (partCommand) {

                        result.push(partCommand);
                    }
                    indexLast = indexNext + 1;
                }
            }

            indexNext++;
            //console.log({letter,stack,str:str.substr(indexLast, indexNext - indexLast)});
        });
        result.push(str.substr(indexLast, indexNext));

        //console.log(result);

        return result;
    }
};

module.exports = parseString;
