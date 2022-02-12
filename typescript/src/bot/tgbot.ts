/** 
 * Telegram Bot on NodeJS project
 * 
 * Copyright (C) 2022 Sergey Denisov GPLv3
 * Written by Sergey Denisov aka LittleBuster (DenisovS21@gmail.com)
 * 
 * tgbot.ts
 */

import { ILog, LogMod } from "../utils/log";
import { Context, Telegraf } from "telegraf";
import { IMenuBuilder } from "./menu/menubld";
import { MenuLevel } from "./menu/gmenu";
import { GlobalButtons } from "./menu/gbtns";

export interface ITgBot {
    start(token: string, users: string[]): any
}

export class TgBot implements ITgBot {
    private process(ctx: Context, msgText: string, users: string[]) {
        let inUser = <string>ctx.message?.from.id.toString()
        let gMenu = this.menuBld.getGlobalMenu()

        if (!this.checkUser(inUser, users))
        {
            this.log.error(LogMod.BOT, "User \"" + ctx.from?.first_name +
                " " + ctx.from?.last_name + " (" + inUser + ")\" not authorized")
            return
        }

        if (msgText == GlobalButtons.BACK_BUTTON) {
            gMenu.back(inUser)
        }

        let level = gMenu.getLevel(inUser)
        let newLevel = this.menuBld.getMenu(level).getUpdates(ctx, msgText)

        if (newLevel != MenuLevel.NONE) {
            this.menuBld.getMenu(newLevel).getUpdates(ctx, msgText)
            gMenu.setLevel(inUser, newLevel)
        }
    }

    private checkUser(user: string, users: string[]): boolean {
        for (let i = 0; i < users.length; i++) {
            if (users[i] == user) {
                return true
            }
        }
        return false
    }

    private initMenus(users: string[]) {
        users.forEach((user) => {
            let gMenu = this.menuBld.getGlobalMenu()
            gMenu.setLevel(user, MenuLevel.MAIN)
        }, this)
    }

    constructor(
        protected log: ILog,
        protected menuBld: IMenuBuilder
    )
    { }

    public async start(token: string, users: string[]) {
        this.initMenus(users)
        const bot = new Telegraf(token)
        bot.on("text", async (ctx) => {
            this.process(ctx, ctx.message.text, users)
        })
        await bot.launch()
    }
}
