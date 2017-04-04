"use strict";

const TreeNode = require("./treeNode");

const treeControlOpen = "{";
const treeControlClose = "}";
const treeControlContent = ":";
const treeControlTerminator = ";";

const treeControlList = [treeControlOpen, treeControlClose];

const recurseParseNa = function (str) {
    if (str.includes(treeControlOpen)) {
        const result = [];
        let indexLast = 0;
        let indexNext = 0;
        let stack = 0;

        str.split("").forEach(letter => {
            if (treeControlList.includes(letter)) {
                if (letter === treeControlOpen) {
                    stack++;

                    if (stack === 1) {
                        result.push(str.substr(indexLast, indexNext - indexLast));
                        indexLast = indexNext;
                    }
                }
                if (letter === treeControlClose) {
                    stack--;

                    if (stack === 0) {
                        result.push(str.substr(indexLast, indexNext - indexLast+1));
                        indexLast = indexNext+1;
                    }
                }
            }

            indexNext++;
        });
        result.push(str.substr(indexLast, indexNext));

        return result; //.map(recurseParseNa);
    } else {
        return str;
    }
};

module.exports = function (na) {
    return recurseParseNa(na);
};
