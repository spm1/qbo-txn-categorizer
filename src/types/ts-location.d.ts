import { z } from "zod"

export enum LocationBuildingCode {
    CalgaryNE1 = "4121",
    CalgaryHQ1 = "4030",
    CalgarySE1 = "2360",
    CalgarySE2 = "1201",
    CalgarySE3 = "5775"
}

export const LocationBuildingCodeSchema = z.nativeEnum(LocationBuildingCode)

const LocationCodeAddressMap: Record<string, string> = {
    "4221": "8"
}

const LocationAddressSchema = z.string().transform((v) => {
    if (LocationCodeAddressMap[v]) {
        return LocationCodeAddressMap[v]
    }
    throw new Error(`${v} is not a valid building code!`)
})