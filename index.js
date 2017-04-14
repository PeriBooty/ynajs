"use strict";

const Options = require("options");
const parse = require("./lib/parser/index");
const run = require("./lib/runner/index");

const infoDefault = new Options({
    name: "anonymous"
});
const optionsDefault = new Options({
    parser: {
        debug: false,
        dropComments: true
    },
    runner: {
        debug: false
    }
});

module.exports = class {
    constructor(na, info, options) {
        const _this = this;

        _this.info = infoDefault.merge(info).value;
        _this.options = optionsDefault.merge(options).value;

        _this.tree = parse(na, _this.options);

        //_this.usedKeys=new Set();
        //_this.usedCommands=new Set();
    }
    /**
     * Runs command
     * @param {Array} args
     * @param {Object} ctx
     */
    run(args, ctx) {
        const _this = this;

        return run(_this.tree, _this.info, _this.options, args, ctx);
    }
};
