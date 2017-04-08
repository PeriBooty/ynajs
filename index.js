"use strict";

const parse = require("./lib/parser/index");
const run = require("./lib/run/index");

module.exports = class {
    constructor(na, creator) {
        const _this = this;
        const tree = parse(na);

        _this.na = na;
        _this.tree = tree;
        _this.creator = creator;
    }
    /**
     * Returns tree of command
     */
    tree() {
        return this.tree;
    }
    /**
     * Runs command
     * @param {Array} args
     * @param {Object} ctx
     */
    run(args, mentions, ctx) {
        return run(this.tree, this.creator, args,mentions, ctx);
    }
};
