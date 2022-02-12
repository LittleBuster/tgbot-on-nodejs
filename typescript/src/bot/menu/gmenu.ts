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
    setLevel(user: string, lvl: MenuLevel): void
    getLevel(user: string): MenuLevel
    back(user: string): void
}

export class GlobalMenu implements IGlobalMenu {
    private curLevel: Map<string, MenuLevel> = new Map<string, MenuLevel>()

    public setLevel(user: string, lvl: MenuLevel) {
        this.curLevel.set(user, lvl)
    }

    public getLevel(user: string): MenuLevel {
        return <MenuLevel>this.curLevel.get(user)
    }

    public back(user: string) {
        switch (this.getLevel(user)) {
            case MenuLevel.METEO:
                this.setLevel(user, MenuLevel.MAIN)
                break

            case MenuLevel.METEO_SENSOR:
                this.setLevel(user, MenuLevel.METEO)
                break

            case MenuLevel.METEO_MONITOR:
                this.setLevel(user, MenuLevel.METEO)
                break

            case MenuLevel.SECURITY:
                this.setLevel(user, MenuLevel.MAIN)
                break

            case MenuLevel.SECURITY_SENSOR:
                this.setLevel(user, MenuLevel.SECURITY)
                break
        }
    }
}
