"use strict";

const Yna = require("./index");
const tag_data = require("./test_data");

//Data dump
const tag = new Yna(tag_data, {
    plugins: {
        discord: true
    }
});
let result;

result = tag.run(["Foo", "Bar"], {
    foo: 1,
    bar: {
        __default: 1,
        bizz: 12
    }
}, {
    debug: false,
});

console.log(result);
