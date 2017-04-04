"use strict";

const parse = require("./parser/index");

module.exports = function (na) {
    const tree = parse(na);


    return tree;
};
