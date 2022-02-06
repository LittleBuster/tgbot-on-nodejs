/** 
 * Telegram Bot on NodeJS project
 * 
 * Copyright (C) 2022 Sergey Denisov GPLv3
 * Written by Sergey Denisov aka LittleBuster (DenisovS21@gmail.com)
 * 
 * configs.ts
 */

import { readFileSync } from 'fs'

export type Settings = {
    token: string
    users: number[]
}

export interface IConfigs {
    loadFromFile(fileName: string): any
}

export class Configs implements IConfigs {
    public loadFromFile(fileName: string): Settings {
        let rawData = readFileSync(fileName)
        return JSON.parse(rawData.toString())
    }
}
