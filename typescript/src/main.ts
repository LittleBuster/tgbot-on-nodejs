/** 
 * Telegram Bot on NodeJS project
 * 
 * Copyright (C) 2022 Sergey Denisov GPLv3
 * Written by Sergey Denisov aka LittleBuster (DenisovS21@gmail.com)
 * 
 * main.ts
 */

import { AppBuilder } from "./apbld"
import { App } from "./app"
import { ServiceCreator } from "./servicecrt"

function main() {
    const creator = ServiceCreator.getInstance()
    const builder = AppBuilder.getInstance(creator)
    const app = App.getInstance(builder)

    app.build()
    app.start()
}

main()
