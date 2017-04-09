"use strict";

const toDatetime = require("./toDatetime");

/**
 *     user: {
        id: "128985967875850240",
        avatarURL:"",
        defaultAvatarURL:"",
        username: "NobodyRocks",
        nickname:"Nobeon",
        discriminator: "5051",
        avatar: "35a8b84d61abf268e326de42e90f33a7",
        bot: false,
        lastMessageID: "300354621493215232"
    },
 */
module.exports = function (obj) {
    return {
        name: obj.username,
        id: obj.id,
        discriminator: obj.discriminator,
        avatar: obj.avatar,
        bot: obj.bot,
        avatar_url: obj.avatarURL,
        default_avatar: obj.defaultAvatar,
        default_avatar_url: obj.defaultAvatarURL,
        mention: `<@!${obj.id}>`,
        created_at: toDatetime(obj.createdTimestamp),
        display_name: obj.nickname
    };
};
