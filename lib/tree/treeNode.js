"use strict";


module.exports = class {
    constructor(name) {
        const _this = this;

        _this.name = name || "";
        _this.data = [];
        _this.children = [];
    }
};
