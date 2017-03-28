"use strict";

const TreeNode = require("./treeNode");

const treeControlOpen = "{";
const treeControlClose = "}";
const treeControlContent = ":";
const treeControlTerminator = ";";
const treeControlAll = [treeControlOpen, treeControlClose, treeControlContent, treeControlTerminator];

module.exports = function (na) {
    const arr = na.split("");
    const tree = new TreeNode("_root");
    let currentNode = tree;
    let lastNode = null;
    let cache = [];

    arr.forEach(letter => {
        if (treeControlAll.includes(letter)) {
            //Set node name
            if (!currentNode.name) {
                currentNode.name = cache.join("");
                cache = [];
            }

            //Manage nesting
            if (letter === treeControlOpen) {
                const newLayer = new TreeNode();

                currentNode.children.push(newLayer);
                lastNode = currentNode;
                currentNode = newLayer;

            } else if (letter === treeControlClose) {
                currentNode = lastNode;
            }
        } else {
            cache.push(letter);
        }
    });


    console.log(JSON.stringify(tree, " ", " "));

    return tree;
};
