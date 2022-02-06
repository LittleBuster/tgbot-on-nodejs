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

export interface ITgBot {
    start(token: string, users: number[]): any
}

export class TgBot implements ITgBot {
    private process(ctx: Context, msgText: string, users: number[]) {
        if (!this.checkUser(ctx.message?.from.id, users))
        {
            this.log.error(LogMod.BOT, "User \"" + ctx.from?.first_name +
                " " + ctx.from?.last_name + "\" not authorized")
            return
        }

        if (msgText == "Назад") {
            this.menuBld.getGlobalMenu().back()
        }

        let level = this.menuBld.getGlobalMenu().getLevel()
        let newLevel = this.menuBld.getMenu(level).getUpdates(ctx, msgText)

        if (newLevel != MenuLevel.NONE) {
            this.menuBld.getMenu(newLevel)?.getUpdates(ctx, msgText)
            this.menuBld.getGlobalMenu().setLevel(newLevel)
        }
    }

    private checkUser(user: number | undefined, users: number[]): boolean {
        for (let i = 0; i < users.length; i++) {
            if (users[i] == user) {
                return true
            }
        }
        return false
    }

    constructor(
        protected log: ILog,
        protected menuBld: IMenuBuilder
    )
    { }

    public async start(token: string, users: number[]) {
        const bot = new Telegraf(token)
        bot.on("text", async (ctx) => {
            this.process(ctx, ctx.message.text, users)
        })
        await bot.launch()
    }
}
