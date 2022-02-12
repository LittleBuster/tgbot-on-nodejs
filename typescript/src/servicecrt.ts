/** 
 * Telegram Bot on NodeJS project
 * 
 * Copyright (C) 2022 Sergey Denisov GPLv3
 * Written by Sergey Denisov aka LittleBuster (DenisovS21@gmail.com)
 * 
 * svcreator.ts
 */

import { IMenuBuilder } from "./bot/menu/menubld"
import { IMenuCreator, MenuCreator } from "./bot/menu/menucrt"
import { ITgBot, TgBot } from "./bot/tgbot"
import { Configs, IConfigs } from "./utils/configs"
import { ILog, Log } from "./utils/log"
import { MenuBuilder } from "./bot/menu/menubld"
import { Api, IApi } from "./api/api"
import { ApiCreator, IApiCreator } from "./api/apicrt"
import { IAppBuilder } from "./apbld"

export interface IServiceCreator {
    createLog(): ILog
    createConfigs(): IConfigs
    createTgBot(log: ILog, menuBld: IMenuBuilder): ITgBot
    createMenuCreator(log: ILog, api: IApi): IMenuCreator
    createMenuBuilder(creator: IMenuCreator): IMenuBuilder
    createApiCreator(): IApiCreator
    createApi(apiCrt: IApiCreator): IApi
}

export class ServiceCreator implements IServiceCreator {
    private static instance: IServiceCreator

    public static getInstance(): IServiceCreator {
        if (!this.instance)
            this.instance = new ServiceCreator()
        return this.instance
    }

    public createLog(): ILog {
        return new Log()
    }

    public createConfigs(): IConfigs {
        return new Configs()
    }

    public createTgBot(log: ILog, menuBld: IMenuBuilder): ITgBot {
        return new TgBot(log, menuBld)
    }

    public createMenuCreator(log: ILog, api: IApi): IMenuCreator {
        return new MenuCreator(log, api)
    }

    public createMenuBuilder(creator: IMenuCreator): IMenuBuilder {
        return new MenuBuilder(creator)
    }

    public createApiCreator(): IApiCreator {
        return new ApiCreator()
    }

    public createApi(apiCrt: IApiCreator): IApi {
        return new Api(apiCrt)
    }
}
