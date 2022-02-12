/** 
 * Telegram Bot on NodeJS project
 * 
 * Copyright (C) 2022 Sergey Denisov GPLv3
 * Written by Sergey Denisov aka LittleBuster (DenisovS21@gmail.com)
 * 
 * Simple Telegram bot on JS
 */

import { Telegraf } from "telegraf"
import * as log from "../utils/log.js"
import * as gmenu from "./menu/globalm.js"
import * as mainm from "./menu/main/mainm.js"
import * as meteom from "./menu/meteo/meteom.js"
import * as securem from "./menu/secure/securem.js"

/**
 * Telegram private functions
 */

function processMenu(ctx, from) {
    switch (gmenu.getLevel(from.id.toString())) {
        case gmenu.MAIN_LEVEL:
            return mainm.mainHandler(ctx)

        case gmenu.METEO_LEVEL:
            return meteom.mainHandler(ctx)

        case gmenu.SECURE_LEVEL:
            return securem.mainHandler(ctx)
    
        default:
            return gmenu.NONE_LEVEL
    }
}

function processMessage(ctx, users) {
    let from = ctx.message.from
    let user = from.id.toString()
    let message = ctx.message.text

    if (!checkUser(from.id, users)) {
        log.error(log.BOT_MOD, "User \"" + from.first_name +  " " +
        from.last_name + " (" + from.id + ")\" not authorized")
        return
    }

    if (message == gmenu.BACK_BUTTON) {
        gmenu.back(user)
    }
    
    let newLevel = processMenu(ctx, from)
    if (newLevel != gmenu.NONE_LEVEL) {
        gmenu.setLevel(user, newLevel)
        processMenu(ctx, from)
    }
}

function checkUser(curUser, users) {
    let found = false

    users.forEach((usr) => {
        if (usr == curUser) {
            found = true
            return
        }
    })

    return found
}

/**
 * Telegram public functions
 */

export async function startServer(token, users) {
    gmenu.initMenu(users)

    const bot = new Telegraf(token)
    bot.on("text", async (ctx) => {
        processMessage(ctx, users)
    })

    await bot.launch()
}