import { Injectable } from "@nestjs/common"
import { InvoiceSalesLines } from "src/types/qbo-api-response"

@Injectable
export class ClassFind {
    private locationId: string
    private salesLines: InvoiceSalesLines
    private classifiedLines: any[]

    constructor() {}

    findTarget() {

    }

}