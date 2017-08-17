"use strict";

const convertMember = require("./lib/convertMember");

module.exports = function (dataRaw) {
    const discord = this.options.plugins.discord;

    const membersArr = discord.msg.guild.members.array();
    const randomMember = convertMember(membersArr[Math.floor(Math.random() * membersArr.length)]);

    return randomMember.__default;
};
