"use strict";

const moment = require("moment");
const convert = require("../convert/index");

module.exports = function (tag, args, mentionsArr, ctx) {
    const map = new Map();

    const server = convert("server", ctx.server);
    const channel = convert("channel", ctx.channel);
    const creator = convert("user", tag.caller);
    const caller = convert("user", ctx.caller);
    const mentions = mentionsArr.map(mention => convert("user", mention));
    const time = moment(ctx.time).format("YYYY-MM-DD HH:mm:ss:SSSSSS");

    //Tag
    map.set("tag", tag.name);
    map.set("me", creator);
    map.set("meid", creator.id);

    //Context
    map.set("caller", caller);
    map.set("callerid", caller.id);
    map.set("channel", channel);
    map.set("channelid", channel.id);
    map.set("server", server);
    map.set("serverid", server.id);
    map.set("time", time);
    map.set("uses", String(ctx.uses));
    map.set("newrep", String(ctx.newrep));

    //Args
    map.set("args", args.join(" "));
    map.set("arglen", String(args.length));
    args.forEach((arg, index) => {
        map.set("arg" + index, arg);
    });

    //Mentions
    map.set("mentionlen", String(mentions.length));
    mentions.forEach((mention, index) => {
        map.set("mention" + index, mention);
    });

    return map;
};
