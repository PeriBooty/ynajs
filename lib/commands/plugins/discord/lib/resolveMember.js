"use strict";

const toFullName = require("./toFullName");

module.exports = (memberResolvable, guild) => guild.members.find((val, key) =>
    key === memberResolvable ||
    toFullName(val.user) === memberResolvable ||
    val.user.username === memberResolvable ||
    val.nickname === memberResolvable
);
