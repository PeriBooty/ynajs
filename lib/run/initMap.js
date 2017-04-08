"use strict";

module.exports = function (creator, args, mentions, ctx) {
    const map = new Map();

    //context
    map.set("tag", ctx.tag);
    map.set("meid", ctx.meid);
    map.set("caller", ctx.caller);
    map.set("channel", ctx.channel);
    map.set("channelid", ctx.channelid);
    map.set("server", ctx.server);
    map.set("serverid", ctx.serverid);
    map.set("time", new Date(ctx.time).toUTCString());
    map.set("uses", String(ctx.uses));
    map.set("newrep", String(ctx.newrep));

    //Creator
    map.set("me", creator.name);

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
