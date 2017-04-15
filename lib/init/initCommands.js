"use strict";

const mapFromObject = require("../util/mapFromObject");

const set = require("../commands/set");
const func = require("../commands/func");
const when = require("../commands/when");

const oneline = require("../commands/oneline");
const upper = require("../commands/upper");
const lower = require("../commands/lower");
const title = require("../commands/title");
//const rep = require("./commands/rep");
//const parse = require("./commands/parse");
//const slice = require("./commands/slice");
//const substition = require("./commands/substition");

const len = require("../commands/len");
const time = require("../commands/time");

const choose = require("../commands/choose");
const wchoose = require("../commands/wchoose");
const num = require("../commands/num");

/**
 * Creates map of aviable commands
 * @returns {Map}
 */
module.exports = function () {
    return mapFromObject({
        set,
        func,
        //when,
        oneline,
        upper,
        lower,
        title,
        len,
        time,
        choose,
        wchoose,
        num
    });
};
