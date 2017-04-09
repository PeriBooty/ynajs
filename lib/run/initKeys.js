"use strict";

const toDatetime = require("../convert/toDatetime");

module.exports = function (tag, args = [], mentions = [], ctx = {}) {
    const map = new Map();
    const time = toDatetime(ctx.time);

    //Tag
    map.set("tag", tag.name);
    map.set("me", tag.creator);
    map.set("meid", tag.creator ? tag.creator.id : null);

    //Context
    map.set("caller", ctx.caller);
    map.set("callerid", ctx.caller ? ctx.caller.id : null);
    map.set("channel",  ctx.channel);
    map.set("channelid",  ctx.channel ? ctx.channel.id : null);
    map.set("server", ctx.server);
    map.set("serverid", ctx.server ? ctx.server.id : null);
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
