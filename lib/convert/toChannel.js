"use strict";

/**
 *     channel: {
        type: "text",
        id: "292977678745862145",
        name: "kanto",
        position: 3,
        topic: "**Welcome to Kanto!**\n\nThis is the general channel!",
        lastMessageID: "300355246117355534",
    },
 */

module.exports = function (obj) {
    return {
        name,
        server,
        id,
        topic,
        is_private,
        position,
        type,
        bitrate,
        is_default,
        user_limit,
        mention,
        created_at
    };
};
