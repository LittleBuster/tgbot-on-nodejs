/** 
 * Telegram Bot on NodeJS project
 * 
 * Copyright (C) 2022 Sergey Denisov GPLv3
 * Written by Sergey Denisov aka LittleBuster (DenisovS21@gmail.com)
 * 
 * main.js
 */

/**
 * Main menu processor
 */
class MainMenu {
    /**
     * Init main menu function
     * 
     * @param {Menu} menu Global menu
     * @param {MeteoMenu} menuMeteo Meteo menu processor
     */
    constructor (menu, menuMeteo) {
        this.menu = menu
        this.menuMeteo = menuMeteo
    }

    /**
     * Welcome message
     * 
     * @param {*} ctx Telegram bot context
     * @param {String} msg Incomming message
     */
    intro(ctx, msg) {
        ctx.replyWithHTML("<b>MAIN MENU</b>\nWelcome to main menu", {
            reply_markup: {
                keyboard: [
                    ["Метео"]
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
            case "Метео":
                this.menu.setMenu("METEO")
                this.menuMeteo.getUpdates(ctx, msg)
                break;
        
            default:
                this.intro(ctx, msg)
                break;
        }
    }
}

exports.MainMenu = MainMenu;