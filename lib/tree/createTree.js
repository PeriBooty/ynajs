"use strict";

const TreeNode = require("./treeNode");

const treeControlOpen = "{";
const treeControlClose = "}";
const treeControlContent = ":";
const treeControlTerminator = ";";

const treeControlList = [treeControlOpen, treeControlClose, treeControlContent, treeControlTerminator];

const recurseParseNa = function (na) {
    if(na.includes(treeControlOpen)){
        const result=[];


    }else{
        return na;
    }
};

module.exports = function (na) {
    return recurseParseNa(na);
};
