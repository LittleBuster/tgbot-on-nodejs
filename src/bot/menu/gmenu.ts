/** 
 * Telegram Bot on NodeJS project
 * 
 * Copyright (C) 2022 Sergey Denisov GPLv3
 * Written by Sergey Denisov aka LittleBuster (DenisovS21@gmail.com)
 * 
 * gmenu.ts
 */

export enum MenuLevel {
    NONE,
    MAIN,
    METEO,
    METEO_SENSOR,
    METEO_MONITOR,
    SECURITY,
    SECURITY_SENSOR
}

export interface IGlobalMenu {
    setLevel(lvl: MenuLevel): void
    getLevel(): MenuLevel
    back(): void
}

export class GlobalMenu implements IGlobalMenu {
    private curLevel: MenuLevel = MenuLevel.MAIN

    public setLevel(lvl: MenuLevel) {
        this.curLevel = lvl
    }

    public getLevel(): MenuLevel {
        return this.curLevel
    }

    public back() {
        switch (this.getLevel()) {
            case MenuLevel.METEO:
                this.setLevel(MenuLevel.MAIN)
                break

            case MenuLevel.METEO_SENSOR:
                this.setLevel(MenuLevel.METEO)
                break

            case MenuLevel.METEO_MONITOR:
                this.setLevel(MenuLevel.METEO)
                break

            case MenuLevel.SECURITY:
                this.setLevel(MenuLevel.MAIN)
                break

            case MenuLevel.SECURITY_SENSOR:
                this.setLevel(MenuLevel.SECURITY)
                break
        }
    }
}
