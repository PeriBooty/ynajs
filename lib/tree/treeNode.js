"use strict";


module.exports = class {
    constructor(parent,name) {
        const _this = this;

        _this.name = name || "";
        _this.data = [];

        _this.parent = parent;
        _this.children = [];
    }
};
