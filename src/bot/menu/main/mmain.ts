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
import { MainButtons } from "./mainbtns";
 
export class MainMenu implements IMenu {
    private process(ctx: Context, msgText: string) {
        this.log.info(LogMod.MMAIN, "Main Menu called")
        ctx.replyWithHTML("<b>MAIN MENU</b>", {
            reply_markup: {
                keyboard: [
                    [MainButtons.MAIN_METEO],
                    [MainButtons.MAIN_SECURITY]
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
            case MainButtons.MAIN_METEO:
                return MenuLevel.METEO

            case MainButtons.MAIN_SECURITY:
                return MenuLevel.SECURITY

            default:
                setTimeout(() => { this.process(ctx, msgText) })
                break
        }
        return MenuLevel.NONE
    }
}
