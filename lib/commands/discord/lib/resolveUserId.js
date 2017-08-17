"use strict";

module.exports = function (memberResolvable, guild) {
    const member = guild.member(memberResolvable);

    return member ? member : null;
};
