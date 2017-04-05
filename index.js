"use strict";

const parse = require("./lib/parser/index");

module.exports = class {
    constructor(na) {
        const _this = this;
        const tree = parse(na);

        _this.na = na;
        _this.tree = tree;
    }
    run(args) {
        //return runNa(this.optimized, args);
    }
};
