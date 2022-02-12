/** 
 * Telegram Bot on NodeJS project
 * 
 * Copyright (C) 2022 Sergey Denisov GPLv3
 * Written by Sergey Denisov aka LittleBuster (DenisovS21@gmail.com)
 * 
 * Simple Telegram bot on JS
 */

import * as log from "../../../utils/log.js"
import * as gmenu from "../globalm.js"

/**
 * Menu handler private functions
 */

function processLevel(ctx) {
    log.info(log.HAND_MOD, "Secure handler")
    ctx.replyWithHTML("<b>SECURE MENU</b>", {
        reply_markup: {
            keyboard: [
                [gmenu.BACK_BUTTON]
            ]
        }
    })
}

/**
 * Menu handler public functions
 */

export function mainHandler(ctx) {
    switch (ctx.message.text) {
        default:
            setTimeout(() => { processLevel(ctx) })
    }
    return gmenu.NONE_LEVEL
}