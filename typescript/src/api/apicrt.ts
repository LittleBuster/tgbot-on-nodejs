/** 
 * Telegram Bot on NodeJS project
 * 
 * Copyright (C) 2022 Sergey Denisov GPLv3
 * Written by Sergey Denisov aka LittleBuster (DenisovS21@gmail.com)
 * 
 * apicrt.ts
 */

import { IMeteoApi, MeteoApi } from "./modules/meteoapi";
import { ISecureApi, SecureApi } from "./modules/secureapi";

export interface IApiCreator {
    createMeteoApi(): IMeteoApi
    createSecureApi(): ISecureApi
}

export class ApiCreator implements IApiCreator {
    public createMeteoApi(): IMeteoApi {
        return new MeteoApi()
    }

    public createSecureApi(): ISecureApi {
        return new SecureApi()
    }
}