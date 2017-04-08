"use strict";

const toUser = require("./toUser");
const toChannel = require("./toChannel");
const toServer = require("./toServer");

module.exports = function (type, obj) {
    if (type === "user") {
        return toUser(obj);
    } else if (type === "channel") {
        return toChannel(obj);
    } else if (type === "server") {
        return toServer(obj);
    }
};
