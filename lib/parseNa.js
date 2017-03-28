"use strict";

const createTree = require("./tree/createTree");

module.exports = function (na) {
    const tree = createTree(na);


    return tree;
};
