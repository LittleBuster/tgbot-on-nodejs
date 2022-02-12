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
import { MeteoButtons } from "./meteobtns";
 
export class MeteoMenu implements IMenu {
    private async process(ctx: Context, msgText: string) {
        this.log.info(LogMod.MMETEO, "Meteo Menu called")
        let outTxt = "<b>METEO MENU</b>\n\n"

        let data = this.api.getMeteo().getAllData()
        for (let i = 0; i < data.length; i++) {
            outTxt += "<b>Room</b>: " + data[i].room + "\n"
            outTxt += "<b>Temp</b>: " + data[i].temp + "\n"
            outTxt += "\n"
        }

        await ctx.replyWithHTML(outTxt, {
            reply_markup: {
                keyboard: [
                    [MeteoButtons.SENSOR_BUTTON, MeteoButtons.MONITOR_BUTTON],
                    [MeteoButtons.BACK_BUTTON]
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
            case MeteoButtons.MONITOR_BUTTON:
                return MenuLevel.METEO_MONITOR

            case MeteoButtons.SENSOR_BUTTON:
                return MenuLevel.METEO_SENSOR

            default:
                setTimeout(() => { this.process(ctx, msgText) })
                break
        }
        return MenuLevel.NONE
    }
}
