"use strict";

const TreeNode = require("./treeNode");

const treeControlOpen = "{";
const treeControlClose = "}";
const treeControlContent = ":";
const treeControlTerminator = ";";

const treeControlList = [treeControlOpen, treeControlClose];

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
                    const part = str.substr(indexLast, indexNext - indexLast);

                    result.push(part);
                    indexLast = indexNext;
                }
            }
            if (letter === treeControlClose) {
                stack--;

                if (stack === 0) {
                    const part = str.substr(indexLast, indexNext - indexLast + 1);

                    result.push(part);
                    indexLast = indexNext + 1;
                }
            }
        }

        indexNext++;
    });
    result.push(str.substr(indexLast, indexNext));

    return result;
};

module.exports = function (na) {
    return parseString(na);
};
