/** 
 * Telegram Bot on NodeJS project
 * 
 * Copyright (C) 2022 Sergey Denisov GPLv3
 * Written by Sergey Denisov aka LittleBuster (DenisovS21@gmail.com)
 * 
 * sensor.js
 */

/**
 * Meteo sensor menu processor
 */
class SensorMenu {
    /**
     * Welcome message
     * 
     * @param {*} ctx Telegram bot context
     * @param {String} msg Incomming message
     */
    intro(ctx, msg) {
        ctx.replyWithHTML("<b>SENSOR MENU</b>", {
            reply_markup: {
                keyboard: [
                    ["Назад"]
                ]
            }
        })
        console.log(msg)
    }

    /**
     * Process incomming messages
     * 
     * @param {*} ctx Telegram bot context 
     * @param {String} msg Incomming message
     */
    getUpdates(ctx, msg) {
        this.intro(ctx, msg)
    }
}

exports.SensorMenu = SensorMenu;