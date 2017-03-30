"use strict";

const TreeNode = require("./treeNode");

const treeControlOpen = "{";
const treeControlClose = "}";
const treeControlContent = ":";
const treeControlTerminator = ";";

const treeControlList = [treeControlOpen, treeControlClose, treeControlContent, treeControlTerminator];

module.exports = function (na) {
    const arr = na.split("");
    const tree = new TreeNode(null, "_root");
    let currentNode = tree;
    let cache = [];

    arr.forEach(letter => {
        if (treeControlList.includes(letter)) {

            //Set node name
            if (letter === treeControlClose || letter === treeControlContent) {
                if (!currentNode.name) {
                    currentNode.name = cache.join("");
                    cache = [];
                }
            }
            if (letter === treeControlTerminator) {
                currentNode.data.push(cache.join(""));
                cache = [];
            }

            //Manage nesting
            if (letter === treeControlOpen) {
                const newNode = new TreeNode(currentNode);


                cache = [];
                currentNode.children.push(newNode);
                currentNode = newNode;

            } else if (letter === treeControlClose) {
                currentNode = currentNode.parent;
            } else if (letter === treeControlContent) {
                //currentNode = currentNode.parent;
            } else if (letter === treeControlTerminator) {
                //currentNode = currentNode.parent;
            }
        } else {
            cache.push(letter);
        }
    });


    //util.log(tree);

    return tree;
};
