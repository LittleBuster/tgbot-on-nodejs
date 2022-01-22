/** 
 * Telegram Bot on NodeJS project
 * 
 * Copyright (C) 2022 Sergey Denisov GPLv3
 * Written by Sergey Denisov aka LittleBuster (DenisovS21@gmail.com)
 * 
 * configs.js
 */

 const fs = require('fs');

/**
 * Application configurations
 */
class Configs {
    /**
     * Loading configs from file
     * 
     * @param {String} path Configs filename
     * @returns Json structure
     */
    readFile(path) {
        let rawdata = fs.readFileSync(path)
        let data = JSON.parse(rawdata)
        return data
    }
}

exports.Configs = Configs;