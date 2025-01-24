import { Injectable } from "@nestjs/common"
import { InvoiceLine, InvoiceSalesLines, InvoiceLineItemClass } from "src/types/qbo-api-response"
import { InvoiceLineClassFind } from "./invoiceLine"

@Injectable
/** Processes each Invoice Line to construct the updated object of the 'line' of QBO's invoice object**/
export class ClassFind {
    private locationId: string
    private salesLines: InvoiceSalesLines
    private classifiedLines: any[]

    constructor(
        locationId: string,
        salesLines: InvoiceSalesLines
    ) {}

    findLineClass(line: InvoiceLine) {
        let lineProcessor = new InvoiceLineClassFind(this.locationId, line)
        let classValue = lineProcessor.call()
        return classValue
    }

    reassembleLine(line: InvoiceLine, classV: string) {
        let qboLineItemClassObject: InvoiceLineItemClass = {
            value: classV
        }
        line.SalesItemLineDetail.ClassRef = qboLineItemClassObject
        return line
    }

    call() {
        for (let [i, line] of this.salesLines.entries()) {
            let classValue = this.findLineClass(line)
            this.salesLines[i] = this.reassembleLine(line, classValue)
        }
        return this.salesLines
    }

}