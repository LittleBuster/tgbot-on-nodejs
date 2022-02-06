/** 
 * Telegram Bot on NodeJS project
 * 
 * Copyright (C) 2022 Sergey Denisov GPLv3
 * Written by Sergey Denisov aka LittleBuster (DenisovS21@gmail.com)
 * 
 * msensor.ts
 */

import { Context } from "telegraf";
import { ILog, LogMod } from "../../../utils/log";
import { MenuLevel } from "../gmenu";
import { IMenu } from "../menu";
import { SecurityButtons } from "./secbtns";

export class SecuritySensorMenu implements IMenu {
    private async process(ctx: Context, msgText: string) {
        this.log.info(LogMod.MSECURESENS, "Security Sensor Menu called")
        await ctx.replyWithHTML("<b>SECURITY SENSOR</b>", {
            reply_markup: {
                keyboard: [
                    [SecurityButtons.BACK_BUTTON]
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
