"use strict";

module.exports = function (memberResolvable, guild) {
    const member = guild.member(memberResolvable);

    if (member) {
        return member;
    } else {
        return null;
    }
};
