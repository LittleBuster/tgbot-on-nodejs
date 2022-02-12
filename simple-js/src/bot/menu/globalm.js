/** 
 * Telegram Bot on NodeJS project
 * 
 * Copyright (C) 2022 Sergey Denisov GPLv3
 * Written by Sergey Denisov aka LittleBuster (DenisovS21@gmail.com)
 * 
 * Simple Telegram bot on JS
 */

var curLevel = new Map()

/**
 * Menu levels
 */

export const NONE_LEVEL = 0
export const MAIN_LEVEL = 1
export const METEO_LEVEL = 2
export const SECURE_LEVEL = 3

/**
 * Menu Global Buttons
 */

export const BACK_BUTTON = "Назад"

/**
 * Global Menu public functions
 */

export function initMenu(users) {
    users.forEach((usr) => {
        curLevel.set(usr, MAIN_LEVEL)
    })
}

export function setLevel(user, level) {
    curLevel.set(user, level)
}

export function getLevel(user) {
    return curLevel.get(user)
}

export function back(user) {
    switch(curLevel.get(user)) {
        case MAIN_LEVEL:
            break

        case METEO_LEVEL:
            setLevel(user, MAIN_LEVEL)
            break

        case SECURE_LEVEL:
            setLevel(user, MAIN_LEVEL)
            break
    }
}