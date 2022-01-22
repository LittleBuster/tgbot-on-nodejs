/** 
 * Telegram Bot on NodeJS project
 * 
 * Copyright (C) 2022 Sergey Denisov GPLv3
 * Written by Sergey Denisov aka LittleBuster (DenisovS21@gmail.com)
 * 
 * meteo.js
 */

/**
 * Meteo menu processor
 */
class MeteoMenu {
    constructor (menu, menuSensor, menuMonitor) {
        this.menu = menu
        this.menuSensor = menuSensor
        this.menuMonitor = menuMonitor
    }

    /**
     * Welcome message
     * 
     * @param {*} ctx Telegram bot context
     * @param {String} msg Incomming message
     */
    intro(ctx, msg) {
        ctx.replyWithHTML("<b>METEO MENU</b>", {
            reply_markup: {
                keyboard: [
                    ["Сенсор"],
                    ["Монитор"],
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
        switch (msg) {
            case "Сенсор":
                this.menu.setMenu("SENSOR")
                this.menuSensor.getUpdates(ctx, msg)
                break;

            case "Монитор":
                this.menu.setMenu("MONITOR")
                this.menuMonitor.getUpdates(ctx, msg)
                break;
        
            default:
                this.intro(ctx, msg)
                break;
        }
    }
}

exports.MeteoMenu = MeteoMenu;