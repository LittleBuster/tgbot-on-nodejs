/** 
 * Telegram Bot on NodeJS project
 * 
 * Copyright (C) 2022 Sergey Denisov GPLv3
 * Written by Sergey Denisov aka LittleBuster (DenisovS21@gmail.com)
 * 
 * msensor.ts
 */

import { Context } from "telegraf";
import { IApi } from "../../../api/api";
import { ILog, LogMod } from "../../../utils/log";
import { MenuLevel } from "../gmenu";
import { IMenu } from "../menu";
import { SecurityButtons } from "./secbtns";

export class SecurityMenu implements IMenu {
    private async process(ctx: Context, msgText: string) {
        this.log.info(LogMod.MSECURE, "Security Menu called")
        let outTxt = "<b>SECURITY MENU</b>\n\n"

        let data = this.api.getSecure().getAllData()
        for (let i = 0; i < data.length; i++) {
            outTxt += "<b>Room</b>: " + data[i].room + "\n"
            outTxt += "<b>State</b>: " + data[i].state + "\n"
            outTxt += "\n"
        }

        await ctx.replyWithHTML(outTxt, {
            reply_markup: {
                keyboard: [
                    [SecurityButtons.SENSOR_BUTTON],
                    [SecurityButtons.BACK_BUTTON]
                ]
            }
        })
    }

    constructor(
        protected log: ILog,
        protected api: IApi
    )
    { }

    public getUpdates(ctx: Context, msgText: string): MenuLevel {
        switch (msgText) {
            case SecurityButtons.SENSOR_BUTTON:
                return MenuLevel.SECURITY_SENSOR

            default:
                setTimeout(() => { this.process(ctx, msgText) })
                break
        }
        return MenuLevel.NONE
    }
}
