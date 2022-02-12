/** 
 * Telegram Bot on NodeJS project
 * 
 * Copyright (C) 2022 Sergey Denisov GPLv3
 * Written by Sergey Denisov aka LittleBuster (DenisovS21@gmail.com)
 * 
 * menu.ts
 */

import { Context } from "telegraf";
import { MenuLevel } from "./gmenu";

export interface IMenu {
    getUpdates(ctx: Context, msgText: string): MenuLevel
}
