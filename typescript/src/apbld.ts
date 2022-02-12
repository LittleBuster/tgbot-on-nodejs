/** 
 * Telegram Bot on NodeJS project
 * 
 * Copyright (C) 2022 Sergey Denisov GPLv3
 * Written by Sergey Denisov aka LittleBuster (DenisovS21@gmail.com)
 * 
 * apbld.ts
 */

import { IApi } from "./api/api"
import { IMenuBuilder } from "./bot/menu/menubld"
import { ITgBot } from "./bot/tgbot"
import { Services } from "./service"
import { IServiceCreator } from "./servicecrt"
import { IConfigs } from "./utils/configs"
import { ILog } from "./utils/log"

export interface IAppBuilder {
    buildUtils(): void
    buildMenu(): void
    buildBot(): void
    buildApi(): void
    getService(id: Services): Object
}

export class AppBuilder implements IAppBuilder {
    private static instance: IAppBuilder

    private log: ILog
    private cfg: IConfigs
    private tgbot: ITgBot
    private menuBld: IMenuBuilder
    private apiBld: IApi

    public static getInstance(creator: IServiceCreator): IAppBuilder {
        if (!this.instance)
            this.instance = new AppBuilder(creator)
        return this.instance
    }

    constructor(
        protected creator: IServiceCreator
    )
    { }

    public buildUtils(): void {
        this.log = this.creator.createLog()
        this.cfg = this.creator.createConfigs()
    }

    public buildApi() {
        let apiCrt = this.creator.createApiCreator()
        this.apiBld = this.creator.createApi(apiCrt)
        this.apiBld.buildApi()
    }

    public buildMenu() {
        let menuCrtr = this.creator.createMenuCreator(this.log, this.apiBld)
        this.menuBld = this.creator.createMenuBuilder(menuCrtr)
        this.menuBld.buildMain()
        this.menuBld.buildMeteo()
        this.menuBld.buildSecurity()
    }

    public buildBot() {
        this.tgbot = this.creator.createTgBot(this.log, this.menuBld)
    }

    public getService(id: Services): Object {
        switch (id) {
            case Services.LOG:
                return this.log

            case Services.CFG:
                return this.cfg

            case Services.TGBOT:
                return this.tgbot
        }
    }
}
