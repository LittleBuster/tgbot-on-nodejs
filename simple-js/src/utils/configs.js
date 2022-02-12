/** 
 * Telegram Bot on NodeJS project
 * 
 * Copyright (C) 2022 Sergey Denisov GPLv3
 * Written by Sergey Denisov aka LittleBuster (DenisovS21@gmail.com)
 * 
 * Simple Telegram bot on JS
 */

import { readFileSync } from "fs"

/**
 * Configs public functions
 */

export function loadFromFile(fileName) {
    let rawData = readFileSync(fileName)
    return JSON.parse(rawData.toString())
}