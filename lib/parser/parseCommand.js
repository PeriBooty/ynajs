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
    const str = strFull.substring(1, strFull.length - 1);
    const contentIndex = str.indexOf(treeControl.content);//gets Index of data start, or comment content

    //console.log(str, contentIndex);

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
            if (letter === treeControl.delimiter && stack === 0) {
                const partString = strData.substr(indexLast, indexNext - indexLast).trim();

                if (partString.startsWith(treeControl.open)) {//Pure command
                    const partCommand = parseCommand(partString);

                    data.push(partCommand);
                } else if (partString.includes(treeControl.open)) {//Text + command

                    const partStringArr = parseString(partString);

                    data.push(partStringArr);
                } else { //Text
                    data.push(partString);
                }

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

module.exports = parseCommand;
