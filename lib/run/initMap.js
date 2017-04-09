"use strict";

const toDatetime = require("../convert/toDatetime");

module.exports = function (tag, args, mentionsArr, ctx) {
    const map = new Map();

    const server = ctx.server;
    const channel = ctx.channel;
    const caller = ctx.caller;
    const mentions = mentionsArr;
    const time = toDatetime(ctx.time);

    //Tag
    map.set("tag", tag.name);
    map.set("me", tag.creator);
    map.set("meid", tag.creator.id);

    //Context
    map.set("caller", caller);
    map.set("callerid", caller.id);
    map.set("channel", channel);
    map.set("channelid", channel.id);
    map.set("server", server);
    map.set("serverid", server.id);
    map.set("time", time);
    map.set("uses", ctx.uses);
    map.set("newrep", ctx.newrep);

    //Args
    map.set("args", args.join(" "));
    map.set("arglen", args.length);
    args.forEach((arg, index) => {
        map.set("arg" + index, arg);
    });

    //Mentions
    map.set("mentionlen", mentions.length);
    mentions.forEach((mention, index) => {
        map.set("mention" + index, mention);
    });

    return map;
};
