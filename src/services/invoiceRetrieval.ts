import { Injectable } from "@nestjs/common"
import { QboFactory } from "../factories/qbo.factory"
import { PreProcessedQboInvoice } from "../interfaces/qbo.interface"
import { InvoiceReadSchema } from "../types/qbo-api-response"

@Injectable
export class InvoiceRetrieval {
    private qbo: QboFactory
    private eventData: any
    
    //configures instance variables for reuse
    constructor(qbo: QboFactory) {
        this.qbo = qbo.getInstance()
    }

    //authenticate to QBO
    private authenticate(): void {}

    /* prepare request body from event */
    private prepareBody(data: PreProcessedQboInvoice): any {
        this.eventData = data.id
    }

    /* build request, make request*/
    call(data: PreProcessedQboInvoice): any {
        this.prepareBody(data)
        const rawInvoice = this.qbo.getInvoice(this.eventData, function(err, inv) {
            if (err) {
                console.error("", err)
            } else {
                return inv
            }
        })
        return this.handleResponse(rawInvoice)
    }

    private handleResponse(resData: any): any {
        const rawData = JSON.parse(resData)
        return InvoiceReadSchema.parse(rawData)
    }

}