/** 
 * Telegram Bot on NodeJS project
 * 
 * Copyright (C) 2022 Sergey Denisov GPLv3
 * Written by Sergey Denisov aka LittleBuster (DenisovS21@gmail.com)
 * 
 * menu.js
 */

/**
 * Global menu processor
 */
class Menu {
    #curMenu = "MAIN"

    /**
     * Switch to new menu item
     * 
     * @param {Menu} Global menu 
     */
    setMenu(menu) {
        this.#curMenu = menu
    }

    /**
     * Get current menu item
     * 
     * @returns {String} Current menu item
     */
    getMenu() {
        return this.#curMenu
    }

    /**
     * Back to prev menu item
     */
    back() {
        switch (this.getMenu()) {
            case "METEO":
                this.setMenu("MAIN")
                break;

            case "SENSOR":
                this.setMenu("METEO")
                break;

            case "MONITOR":
                this.setMenu("METEO")
                break;
        }
    }
}

exports.Menu = Menu;