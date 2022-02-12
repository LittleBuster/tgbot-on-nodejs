/** 
 * Telegram Bot on NodeJS project
 * 
 * Copyright (C) 2022 Sergey Denisov GPLv3
 * Written by Sergey Denisov aka LittleBuster (DenisovS21@gmail.com)
 * 
 * menubld.ts
 */

import { IGlobalMenu, MenuLevel } from "./gmenu"
import { IMenu } from "./menu"
import { IMenuCreator } from "./menucrt"

export interface IMenuBuilder {
    buildMain(): void
    buildMeteo(): void
    buildSecurity(): void
    getGlobalMenu(): IGlobalMenu
    getMenu(id: MenuLevel): IMenu
}

export class MenuBuilder implements IMenuBuilder {
    private globMenu: IGlobalMenu

    private mainMenu: IMenu
    private meteoMenu: IMenu
    private meteoSensMenu: IMenu
    private meteoMonMenu: IMenu
    private secMenu: IMenu
    private secSensMenu: IMenu

    constructor(
        protected creator: IMenuCreator
    )
    { }

    public buildMain(): void {
        this.mainMenu = this.creator.createMainMenu()
        this.globMenu = this.creator.createGlobalMenu()
    }

    public buildMeteo(): void {
        this.meteoMenu = this.creator.createMeteoMenu()
        this.meteoSensMenu = this.creator.createMeteoSensorMenu()
        this.meteoMonMenu = this.creator.createMeteoMonitorMenu()
    }

    public buildSecurity(): void {
        this.secMenu = this.creator.createSecurityMenu()
        this.secSensMenu = this.creator.createSecuritySensorMenu()
    }

    public getGlobalMenu(): IGlobalMenu {
        return this.globMenu
    }

    public getMenu(id: MenuLevel): IMenu {
        switch (id) {
            case MenuLevel.MAIN:
                return this.mainMenu
                
            case MenuLevel.METEO:
                return this.meteoMenu

            case MenuLevel.METEO_SENSOR:
                return this.meteoSensMenu
            
            case MenuLevel.METEO_MONITOR:
                return this.meteoMonMenu

            case MenuLevel.SECURITY:
                return this.secMenu

            case MenuLevel.SECURITY_SENSOR:
                return this.secSensMenu

            case MenuLevel.NONE:
                return this.mainMenu
        }
    }
}
