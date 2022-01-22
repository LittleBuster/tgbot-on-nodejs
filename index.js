/** 
 * Telegram Bot on NodeJS project
 * 
 * Copyright (C) 2022 Sergey Denisov GPLv3
 * Written by Sergey Denisov aka LittleBuster (DenisovS21@gmail.com)
 * 
 * index.js
 */

const { TgBot } = require("./net/bot")
const { Menu } = require("./net/menu/menu")
const { MainMenu } = require("./net/menu/main")
const { MeteoMenu } = require("./net/menu/meteo")
const { SensorMenu } = require("./net/menu/sensor")
const { MonitorMenu } = require("./net/menu/monitor")
const { Configs } = require("./utils/configs")

/**
 * Loading configs from file
 * 
 * @returns Json structure
 */
function loadConfigs() {
    const configs = new Configs()
    let cfg

    try {
        cfg = configs.readFile("configs.json")
    }
    catch (e) {
        console.log(e)
        process.exit(1)
    }

    return cfg
}

/**
 * Main function of application.
 * Construct structure of application here.
 */
function main() {
    const cfg = loadConfigs()

    const menu = new Menu()
    const menuSensor = new SensorMenu(menu)
    const menuMonitor = new MonitorMenu(menu)
    const menuMeteo = new MeteoMenu(menu, menuSensor, menuMonitor)
    const menuMain = new MainMenu(menu, menuMeteo)
    const bot = new TgBot(cfg.token, menu, menuMain, menuMeteo, menuSensor, menuMonitor)

    bot.launch()
}

main()