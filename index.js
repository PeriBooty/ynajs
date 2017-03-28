"use strict";

const parseNa = require("./lib/parseNa");
const runNa = require("./lib/runNa");

module.exports = class {
    constructor(na) {
        const _this = this;

        _this.na = na;
        _this.tree = parseNa(na);
    }
    run(args) {
        return runNa(this.tree, args);
    }
};
