"use strict";

const treeControl = require("./constants");

/**
 * parses command-string into command object
 * @param {String} str
 */
const parseCommand = function (strFull) {
    const parseString = require("./parseString");
    const result = {
        type: null,
        data: []
    };
    const str = strFull.substring(1, strFull.length - 1); //drop start and end braces
    const contentIndex = str.indexOf(treeControl.content);

    if (contentIndex !== -1) { //Full command with data
        const strData = str.substr(contentIndex + 1);
        let indexLast = 0;
        let indexNext = 0;
        let stack = 0;

        result.type = str.substring(0, contentIndex);

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
                     console.log("COMMAND:MIXED",partString);
                    const partStringArr = parseString(partString);

                    result.data.push(partStringArr);
                } else { //Text
                    console.log("COMMAND:TEXT",partString);
                    result.data.push(partString);
                }

                indexLast = indexNext + 1;
            }

            indexNext++;
        });


    } else if (str.startsWith(treeControl.comment)) { //Comment
        result.type = treeControl.comment;
        result.data = [str.substr(1)];
    } else { //Single command
        result.type = str;
    }
    //console.log(result);

    return result;
};

module.exports = parseCommand;
