"use strict";

const parse = require("./lib/parser/index");
const optimize = require("./lib/optimizer/index");

module.exports = class {
    constructor(na) {
        const _this = this;
        const tree = parse(na);
        const optimized = optimize(tree);

        _this.na = na;
        _this.tree = tree;
        _this.optimized = optimized;
    }
    run(args) {
        //return runNa(this.optimized, args);
    }
};
