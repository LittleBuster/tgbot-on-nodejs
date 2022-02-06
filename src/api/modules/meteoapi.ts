/** 
 * Telegram Bot on NodeJS project
 * 
 * Copyright (C) 2022 Sergey Denisov GPLv3
 * Written by Sergey Denisov aka LittleBuster (DenisovS21@gmail.com)
 * 
 * meteoapi.ts
 */

export type MeteoData = {
    room: string
    temp: number
}

export interface IMeteoApi {
    getAllData(): MeteoData[]
    getData(sensor: string): MeteoData
}

export class MeteoApi implements IMeteoApi {
    public getAllData(): MeteoData[] {
        let data: MeteoData[] = []

        data.push({
            room: "kitchen",
            temp: 22
        })

        data.push({
            room: "street",
            temp: -12
        })

        return data
    }

    public getData(sensor: string): MeteoData {
        let data: MeteoData = {
            room: "street",
            temp: -12
        }

        if (sensor == "kitchen") {
            data = {
                room: "kitchen",
                temp: 22
            }
        }

        return data
    }
}