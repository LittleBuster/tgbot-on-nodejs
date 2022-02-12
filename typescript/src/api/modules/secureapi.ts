/** 
 * Telegram Bot on NodeJS project
 * 
 * Copyright (C) 2022 Sergey Denisov GPLv3
 * Written by Sergey Denisov aka LittleBuster (DenisovS21@gmail.com)
 * 
 * secureapi.ts
 */

export type SecureData = {
    room: string
    state: boolean
}

export interface ISecureApi {
    getAllData(): SecureData[]
    getData(sensor: string): SecureData
}

export class SecureApi implements ISecureApi {
    public getAllData(): SecureData[] {
        let data: SecureData[] = []

        data.push({
            room: "kitchen",
            state: true
        })

        data.push({
            room: "street",
            state: false
        })

        return data
    }

    public getData(sensor: string): SecureData {
        let data: SecureData = {
            room: "street",
            state: false
        }

        if (sensor == "kitchen") {
            data = {
                room: "kitchen",
                state: true
            }
        }

        return data
    }
}