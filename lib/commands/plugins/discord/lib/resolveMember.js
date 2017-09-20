"use strict";

const toFullName = require("./toFullName");

module.exports = function (memberResolvable, guild) {
    return guild.members.find((val, key) => {
        if (
            key === memberResolvable ||
            toFullName(val.user) === memberResolvable ||
            val.user.username === memberResolvable ||
            val.nickname === memberResolvable
        ) {
            return true;
        } else {
            return false;
        }
    });
};
