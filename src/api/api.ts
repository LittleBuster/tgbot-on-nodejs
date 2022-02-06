/** 
 * Telegram Bot on NodeJS project
 * 
 * Copyright (C) 2022 Sergey Denisov GPLv3
 * Written by Sergey Denisov aka LittleBuster (DenisovS21@gmail.com)
 * 
 * api.ts
 */

import { IApiCreator } from "./apicrt";
import { IMeteoApi } from "./modules/meteoapi";
import { ISecureApi } from "./modules/secureapi";

export interface IApi {
    buildApi(): void
    getMeteo(): IMeteoApi
    getSecure(): ISecureApi
}

export class Api implements IApi {
    private meteoApi: IMeteoApi
    private secureApi: ISecureApi

    constructor(
        protected apiCrt: IApiCreator
    )
    { }

    public buildApi() {
        this.meteoApi = this.apiCrt.createMeteoApi()
        this.secureApi = this.apiCrt.createSecureApi()
    }

    public getMeteo(): IMeteoApi {
        return this.meteoApi
    }

    public getSecure(): ISecureApi {
        return this.secureApi
    }
}