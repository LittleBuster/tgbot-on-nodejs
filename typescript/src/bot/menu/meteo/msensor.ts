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
import { MeteoButtons } from "./meteobtns";

export class MeteoSensorMenu implements IMenu {
    private async process(ctx: Context, msgText: string) {
        this.log.info(LogMod.MMETEOSENS, "Meteo Sensor Menu called")
        await ctx.replyWithHTML("<b>METEO SENSOR</b>", {
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
