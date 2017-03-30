"use strict";

const TreeNode = require("./treeNode");

const treeControlOpen = "{";
const treeControlClose = "}";
const treeControlContent = ":";
const treeControlTerminator = ";";

const treeControlList = [treeControlOpen, treeControlClose, treeControlContent, treeControlTerminator];

const recurseParseNa = function (str) {
    if (str.includes(treeControlOpen)) {
        const result = [];
        let stack = 0;
        let cache = [];

        str.split("").forEach(letter => {
            if (treeControlList.includes(letter)) {

                if (letter === treeControlOpen) {
                    stack++;
                } else if (letter === treeControlClose) {
                    stack--;
                }

                if (stack === 0) {
                    const data = cache.join("");

                    result.push(data);
                    cache = [];
                }

            } else {
                cache.push(letter);
            }
        });

        return result.map(recurseParseNa);
    } else {
        return str;
    }
};

module.exports = function (na) {
    return recurseParseNa(na);
};
