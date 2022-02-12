/** 
 * Telegram Bot on NodeJS project
 * 
 * Copyright (C) 2022 Sergey Denisov GPLv3
 * Written by Sergey Denisov aka LittleBuster (DenisovS21@gmail.com)
 * 
 * Simple Telegram bot on JS
 */

import * as tgbot from "./bot/tgbot.js"
import * as cfg from "./utils/configs.js"
import * as log from "./utils/log.js"

/**
 * Main function of application
 */

function startApp() {
    let data

    log.info(log.APP_MOD, "Starting application")

    try {
        data = cfg.loadFromFile("configs.json")
    }
    catch(e) {
        log.error(log.APP_MOD, "Failed to load configs", e.message)
        process.exit(1)
    }

    log.info(log.APP_MOD, "Starting bot...")
    tgbot.startServer(data.token, data.users).catch((e) => {
        log.error(log.APP_MOD, "Failed to start bot", e.message)
    })
}

startApp()