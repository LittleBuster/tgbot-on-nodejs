/** 
 * Telegram Bot on NodeJS project
 * 
 * Copyright (C) 2022 Sergey Denisov GPLv3
 * Written by Sergey Denisov aka LittleBuster (DenisovS21@gmail.com)
 * 
 * bot.js
 */

const { Telegraf } = require("telegraf");

/**
 * Extended telegram class with callbacks
 */
class TgBot extends Telegraf {
    /**
     * Process new messages
     * 
     * @param {*} ctx Telegram bot context
     */
    #getUpdates(ctx) {
        let msg = ctx.message.text

        if (msg == "Назад") {
            this.menu.back()
        }

        let menu = this.menu.getMenu()

        switch (menu) {
            case "MAIN":
                this.menuMain.getUpdates(ctx, msg)
                break;

            case "METEO":
                this.menuMeteo.getUpdates(ctx, msg)
                break;

            case "SENSOR":
                this.menuSensor.getUpdates(ctx, msg)
                break;

            case "MONITOR":
                this.menuMonitor.getUpdates(ctx, msg)
                break;
        }
    }

    /**
     * Init telegram class function
     * 
     * @param {Menu} menu Global menu
     * @param {MainMenu} menuMain Main menu processor
     * @param {MeteoMenu} menuMeteo Meteo menu processor
     * @param {SensorMenu} menuSensor Sensor menu processor
     * @param {MonitorMenu} menuMonitor Monitor menu processor
     */
    constructor (token, menu, menuMain, menuMeteo, menuSensor, menuMonitor) {
        super(token)
        
        this.menu = menu
        this.menuMain = menuMain
        this.menuMeteo = menuMeteo
        this.menuSensor = menuSensor
        this.menuMonitor = menuMonitor

        this.on("text", (ctx) => {
            this.#getUpdates(ctx)
        })
    }
}

exports.TgBot = TgBot;