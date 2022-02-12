/** 
 * Telegram Bot on NodeJS project
 * 
 * Copyright (C) 2022 Sergey Denisov GPLv3
 * Written by Sergey Denisov aka LittleBuster (DenisovS21@gmail.com)
 * 
 * mmonitor.ts
 */

import { Context } from "telegraf";
import { ILog, LogMod } from "../../../utils/log";
import { MenuLevel } from "../gmenu";
import { IMenu } from "../menu";
import { MeteoButtons } from "./meteobtns";

export class MeteoMonitorMenu implements IMenu {
    private async process(ctx: Context, msgText: string) {
        this.log.info(LogMod.MMETEOMON, "Meteo Monitor Menu called")
        await ctx.replyWithHTML("<b>METEO MONITOR</b>", {
            reply_markup: {
                keyboard: [
                    [MeteoButtons.BACK_BUTTON]
                ]
            }
        })
    }

    constructor(
        protected log: ILog
    )
    { }

    public getUpdates(ctx: Context, msgText: string): MenuLevel {
        switch (msgText) {
            default:
                setTimeout(() => { this.process(ctx, msgText) })
                break
        }
        return MenuLevel.NONE
    }
}
