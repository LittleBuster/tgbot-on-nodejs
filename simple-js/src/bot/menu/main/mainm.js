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
 * Menu handler buttons
 */

const SECURE_BUTTON = "Охрана"
const METEO_BUTTON = "Метео"

/**
 * Menu handler private functions
 */

function processLevel(ctx) {
    log.info(log.HAND_MOD, "Main handler")
    ctx.replyWithHTML("<b>MAIN MENU</b>", {
        reply_markup: {
            keyboard: [
                [SECURE_BUTTON],
                [METEO_BUTTON]
            ]
        }
    })
}

/**
 * Menu handler public functions
 */

export function mainHandler(ctx) {
    switch (ctx.message.text) {
        case METEO_BUTTON:
            return gmenu.METEO_LEVEL

        case SECURE_BUTTON:
            return gmenu.SECURE_LEVEL

        default:
            setTimeout(() => { processLevel(ctx) })
    }
    return gmenu.NONE_LEVEL
}