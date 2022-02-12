/** 
 * Telegram Bot on NodeJS project
 * 
 * Copyright (C) 2022 Sergey Denisov GPLv3
 * Written by Sergey Denisov aka LittleBuster (DenisovS21@gmail.com)
 * 
 * Simple Telegram bot on JS
 */

import colors from "colors"
import moment from "moment"
import { appendFile } from "fs"

/**
 * Log private variables
 */

var path = "./"

/**
 * Log private types
 */

const LOG_WARN = 0
const LOG_INFO = 1
const LOG_ERR  = 2

/**
 * Log private functions
 */

function logging(module, msg, type, err="") {
    let dateStr = moment().format('YYYY-MM-DD')
    let timeStr = moment().format('HH:MM:SS')
    let outStr = "[" + dateStr.blue + "][" + timeStr.cyan + "]["

    switch (type) {
        case LOG_INFO:
            outStr += "INFO".green
            break

        case LOG_WARN:
            outStr += "WARN".yellow
            break

        case LOG_ERR:
            outStr += "ERROR".red
            break
    }

    outStr += "][" + module.magenta + "] "

    console.log(outStr + msg)
    if (err != "") {
        console.log(outStr + err)
    }
}

function saveToFile(module, type, msg, err="") {
    let dateStr = moment().format('YYYY-MM-DD')
    let timeStr = moment().format('HH:MM:SS')
    let outStr = "[" + dateStr + "][" + timeStr + "]["

    switch (type) {
        case LOG_INFO:
            outStr += "INFO"
            break

        case LOG_WARN:
            outStr += "WARN"
            break

        case LOG_ERR:
            outStr += "ERROR"
            break
    }

    outStr += "][" + module + "] "
    let fileName = moment().format('YYYYMMDD') + ".log"

    appendFile(path + fileName, outStr + msg + "\n", (e) => {
        if (e) {
            logging(LOG_MOD, LOG_ERR, "Fail to write to log file", e.message)
            return
        }

        if (err != "") {
            appendFile(path + fileName, outStr + err + "\n", (e) => {
                if (e)
                    logging(LOG_MOD, LOG_ERR, "Fail to write to log file", e.message)
            })
        }
    })
}

/**
 * Log public modules
 */

export const APP_MOD = "APP"
export const BOT_MOD = "BOT"
export const HAND_MOD = "HAND"
export const LOG_MOD = "LOG"

/**
 * Log public functions
 */

export function info(module, msg) {
    logging(module, msg, LOG_INFO)
    setTimeout(()=> { saveToFile(module, LOG_INFO, msg) })
}

export function warning(module, msg) {
    logging(module, msg, LOG_WARN)
    setTimeout(()=> { saveToFile(module, LOG_WARN, msg) })
}

export function error(module, msg, err) {
    logging(module, msg, LOG_ERR, err)
    setTimeout(()=> { saveToFile(module, LOG_ERR, msg, err) })
}

export function setPath(newPath) {
    path = newPath
}