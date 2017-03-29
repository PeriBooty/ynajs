"use strict";

const TreeNode = require("./treeNode");

const treeControlOpen = "{";
const treeControlClose = "}";
const treeControlContent = ":";
const treeControlTerminator = ";";

const treeControlListTag = [treeControlOpen, treeControlClose, ];
const treeControlListContent = [treeControlContent, treeControlTerminator];

module.exports = function (na) {
    const arr = na.split("");
    const tree = new TreeNode(null, "_root");
    let currentNode = tree;
    let cache = [];

    arr.forEach(letter => {
        if (treeControlListTag.includes(letter)) {
            //Set node name
            if (!currentNode.name) {
                currentNode.name = cache.join("").trim();
                cache = [];
            }

            //Manage nesting
            if (letter === treeControlOpen) {
                const newNode = new TreeNode(currentNode);

                currentNode.children.push(newNode);
                currentNode = newNode;

            } else if (letter === treeControlClose) {
                currentNode = currentNode.parent;
            }
        } else {
            cache.push(letter);
        }
    });


    console.log(tree);

    return tree;
};
