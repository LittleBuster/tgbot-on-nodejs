/** 
 * Telegram Bot on NodeJS project
 * 
 * Copyright (C) 2022 Sergey Denisov GPLv3
 * Written by Sergey Denisov aka LittleBuster (DenisovS21@gmail.com)
 * 
 * monitor.js
 */

/**
 * Monitor menu processor
 */
class MonitorMenu {
    /**
     * Welcome message
     * 
     * @param {*} ctx Telegram bot context
     * @param {String} msg Incomming message
     */
    intro(ctx, msg) {
        ctx.replyWithHTML("<b>MONITOR MENU</b>", {
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

exports.MonitorMenu = MonitorMenu;