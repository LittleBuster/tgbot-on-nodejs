/** 
 * Telegram Bot on NodeJS project
 * 
 * Copyright (C) 2022 Sergey Denisov GPLv3
 * Written by Sergey Denisov aka LittleBuster (DenisovS21@gmail.com)
 * 
 * msensor.ts
 */

import { IApi } from "../../api/api";
import { ILog } from "../../utils/log";
import { GlobalMenu, IGlobalMenu } from "./gmenu";
import { MainMenu } from "./main/mmain";
import { IMenu } from "./menu";
import { MeteoMenu } from "./meteo/meteo";
import { MeteoMonitorMenu } from "./meteo/mmonitor";
import { MeteoSensorMenu } from "./meteo/msensor";
import { SecurityMenu } from "./security/security";
import { SecuritySensorMenu } from "./security/ssensor";

 export interface IMenuCreator {
    createGlobalMenu(): IGlobalMenu
    createMainMenu(): IMenu
    createMeteoMenu(): IMenu
    createMeteoSensorMenu(): IMenu
    createMeteoMonitorMenu(): IMenu
    createSecurityMenu(): IMenu
    createSecuritySensorMenu(): IMenu
 }
 
 export class MenuCreator implements IMenuCreator {
    constructor(
        protected log: ILog,
        protected api: IApi
    )
    { }

    public createGlobalMenu(): IGlobalMenu {
        return new GlobalMenu()
    }

    public createMainMenu(): IMenu {
        return new MainMenu(this.log)
    }

    public createMeteoMenu(): IMenu {
        return new MeteoMenu(this.log, this.api)
    }

    public createMeteoSensorMenu(): IMenu {
        return new MeteoSensorMenu(this.log)
    }

    public createMeteoMonitorMenu(): IMenu {
        return new MeteoMonitorMenu(this.log)
    }

    public createSecurityMenu(): IMenu {
        return new SecurityMenu(this.log, this.api)
    }

    public createSecuritySensorMenu(): IMenu {
        return new SecuritySensorMenu(this.log)
    }
}
