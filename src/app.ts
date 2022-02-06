/** 
 * Telegram Bot on NodeJS project
 * 
 * Copyright (C) 2022 Sergey Denisov GPLv3
 * Written by Sergey Denisov aka LittleBuster (DenisovS21@gmail.com)
 * 
 * app.ts
 */

import { IAppBuilder } from "./apbld"
import { ITgBot } from "./bot/tgbot"
import { Services } from "./service"
import { IConfigs, Settings } from "./utils/configs"
import { ILog, LogMod } from "./utils/log"

export interface IApp {
    build(): void
    start(): void
}

export class App implements IApp {
    private static instance: IApp

    public static getInstance(builder: IAppBuilder): IApp {
        if (!this.instance)
            this.instance = new App(builder)
        return this.instance
    }

    constructor(
        protected builder: IAppBuilder
    )
    { }

    public build(): void {
        this.builder.buildUtils()
        this.builder.buildApi()
        this.builder.buildMenu()
        this.builder.buildBot()
    }

    public start(): void {
        const log = <ILog>this.builder.getService(Services.LOG)
        const cfg = <IConfigs>this.builder.getService(Services.CFG)
        const bot = <ITgBot>this.builder.getService(Services.TGBOT)

        log.setFilePath("./")
        log.info(LogMod.APP, "Starting application...")

        let data: Settings
        try {
            data = cfg.loadFromFile("./configs.json")
        }
        catch(err: any) {
            log.error(LogMod.APP, "Fail to open configs", err.message)
            process.exit(1)
        }

        try {
            bot.start(data.token, data.users)
        }
        catch(err: any) {
            log.error(LogMod.APP, "Fail to start bot", err.message)
        }
    }
}
