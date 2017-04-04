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
        let stack = 0;
        let cache = [];
        let nextRoutine = false;

        str.split("").forEach(letter => {
            if (treeControlList.includes(letter)) {
                if (letter === treeControlClose) {
                    stack--;
                }
                if (letter === treeControlOpen) {
                    stack++;
                }
                nextRoutine = true;
            }

            if (stack === 0 && nextRoutine) {
                result.push(cache.join(""));
                cache = [];

                nextRoutine = false;
            }

            cache.push(letter);
            //console.log([letter, stack, nextRoutine, cache.join("")]);
        });
        result.push(cache.join(""));
        cache = [];

        return result; //.map(recurseParseNa);
    } else {
        return str;
    }
};

module.exports = function (na) {
    return recurseParseNa(na);
};
