"use strict";

const TreeNode = require("./treeNode");

const treeControlOpen = "{";
const treeControlClose = "}";
const treeControlContent = ":";
const treeControlTerminator = ";";

const treeControlList = [treeControlOpen, treeControlClose];

/**
 * Parses string into str/command parts
 * @param {String} str
 */
const parseString = function (str) {
    const result = [];
    let indexLast = 0;
    let indexNext = 0;
    let stack = 0;

    str.split("").forEach(letter => {
        if (treeControlList.includes(letter)) {
            if (letter === treeControlOpen) {
                stack++;

                if (stack === 1) {
                    const partString = str.substr(indexLast, indexNext - indexLast);

                    result.push(partString);
                    indexLast = indexNext;
                }
            }
            if (letter === treeControlClose) {
                stack--;

                if (stack === 0) {
                    const partString = str.substr(indexLast, indexNext - indexLast + 1);
                    const partCommand = parseCommand(partString);

                    result.push(partCommand);
                    indexLast = indexNext + 1;
                }
            }
        }

        indexNext++;
    });
    result.push(str.substr(indexLast, indexNext));

    return result;
};

/**
 * parses command-string into command object
 * @param {String} str
 */
const parseCommand = function (str) {
    const result = {
        type: null,
        data: []
    };
    const strStripped = str.substring(1, str.length - 1);
    const contentIndex = strStripped.indexOf(treeControlContent);

    result.type = contentIndex !== -1 ? strStripped.substring(0, contentIndex) : strStripped;


    console.log(strStripped);
    return result;
};

module.exports = function (na) {
    return parseString(na);
};
