"use strict";

const parse = require("./lib/parser/index");
const run = require("./lib/run/index");

module.exports = class {
    constructor(name, na, creator) {
        const _this = this;

        _this.name = name;
        _this.na = na;
        _this.creator = creator;

        _this.tree = parse(na);
    }
    /**
     * Runs command
     * @param {Array} args
     * @param {Object} ctx
     */
    run(args, mentions, ctx) {
        return run(this, args, mentions, ctx);
    }
    /**
     * Returns tree of command
     */
    tree() {
        return this.tree;
    }
    /**
     * Returns info
     */
    info() {
        const _this = this;

        return {
            name: _this.name,
            creator: _this.name
        };
    }
};
