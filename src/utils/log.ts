/** 
 * Telegram Bot on NodeJS project
 * 
 * Copyright (C) 2022 Sergey Denisov GPLv3
 * Written by Sergey Denisov aka LittleBuster (DenisovS21@gmail.com)
 * 
 * log.ts
 */

import moment from 'moment'
import color from 'colorts'
import { appendFile } from 'fs'

enum LogType {
    LOG_INFO,
    LOG_WARN,
    LOG_ERROR
}

export enum LogMod {
    LOG = "LOG",
    APP = "APP",
    BOT = "BOT",
    MMAIN = "MMAIN",
    MMETEO = "MMETEO",
    MMETEOSENS = "MMETEOSENS",
    MMETEOMON = "MMETEOMON",
    MSECURE = "MSECURE",
    MSECURESENS = "MSECURESENS"
}

export interface ILog {
    setFilePath(path: string): void
    info(module:string, msg: string): void
    warn(module:string, msg: string): void
    error(module:string, msg: string, err?: string): void
}

export class Log implements ILog {
    private path: string = "./"

    private saveToFile(module: LogMod, type: LogType, msg: string, err: string="") {
        let time = moment(new Date(), "hh:mm:ss")

        let timeStr = time.hour() + ":" + time.minute() + ":" + time.second()
        let dateStr = time.year() + "." + time.month() + "." + time.day()
        let outStr = "[" + dateStr + "][" + timeStr + "]["

        switch (type) {
            case LogType.LOG_INFO:
                outStr += "INFO"
                break

            case LogType.LOG_WARN:
                outStr += "WARN"
                break

            case LogType.LOG_ERROR:
                outStr += "ERROR"
                break
        }

        outStr += "][" + module + "] "
        let fileName = time.year() + time.month() + time.day() + ".log"

        appendFile(this.path + fileName, outStr + msg + "\n", (e) => {
            if (e) {
                this.logging(LogMod.LOG, LogType.LOG_ERROR, "Fail to write to log file", e.message)
                return
            }

            if (err != "") {
                appendFile(this.path + fileName, outStr + err + "\n", (e) => {
                    if (e)
                        this.logging(LogMod.LOG, LogType.LOG_ERROR, "Fail to write to log file", e.message)
                })
            }
        })
    }

    private logging(module: LogMod, type: LogType, msg: string, err: string="") {
        let time = moment(new Date(), "hh:mm:ss")
        let timeStr = time.hour() + ":" + time.minute() + ":" + time.second()
        let dateStr = time.year() + "." + time.month() + "." + time.day()
        let outStr = "[" + color(dateStr).blue + "][" + color(timeStr).cyan + "]["

        switch (type) {
            case LogType.LOG_INFO:
                outStr += color("INFO").green
                break

            case LogType.LOG_WARN:
                outStr += color("WARN").yellow
                break

            case LogType.LOG_ERROR:
                outStr += color("ERROR").red
                break
        }

        outStr += "][" + color(module).magenta + "] "

        console.log(outStr + msg)
        if (err != "") {
            console.log(outStr + err)
        }
    }

    public setFilePath(path: string): void {
        this.path = path
    }

    public info(module: LogMod, msg: string): void {
        this.logging(module, LogType.LOG_INFO, msg)
        this.saveToFile(module, LogType.LOG_INFO, msg)
    }

    public warn(module: LogMod, msg: string): void {
        this.logging(module, LogType.LOG_WARN, msg)
        this.saveToFile(module, LogType.LOG_WARN, msg)
    }

    public error(module: LogMod, msg: string, err: string=""): void {
        this.logging(module, LogType.LOG_ERROR, msg, err)
        this.saveToFile(module, LogType.LOG_ERROR, msg, err)
    }

}
