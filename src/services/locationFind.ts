import { Injectable } from "@nestjs/common"
import { InvoiceRead, TargetLocationStringSchema } from "../types/qbo-api-response";
import { LocationAddressSchema, LocationBuildingCode, LocationBuildingCodeSchema } from "src/types/ts-location";

@Injectable
export class LocationFind {
    private docNumberString: string
    private locationCode: string
    private trueLocation: string

    constructor() {}

    findTarget(invData: InvoiceRead) {
        this.docNumberString = TargetLocationStringSchema.parse(invData)
    }

    extractTarget() {
        let rawTarget = this.docNumberString
        let lCode = rawTarget.split("-",2)[1]
        lCode = LocationBuildingCodeSchema.parse(lCode)
        this.locationCode = lCode
    }

    translateTarget() {
        let rawAddress = LocationAddressSchema.parse(this.locationCode)
        this.trueLocation = rawAddress
    }

    call(invData: InvoiceRead): string {
        this.findTarget(invData)
        this.extractTarget()
        this.translateTarget()
        return this.trueLocation
    }

}