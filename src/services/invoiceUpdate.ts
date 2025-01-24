import { Injectable } from "@nestjs/common"
import { QboFactory } from "../factories/qbo.factory"

@Injectable
export class InvoiceFullUpdate {
    private data: InvoiceRead

    constructor(private qbo: QboFactory) {
        this.qbo = qbo.getInstance()
    }

    private prepareBody(data: InvoiceRead) {
        this.data = data
    }

    call(data: InvoiceRead): InvoiceRead | Error {
        this.prepareBody(data)
        const updatedInvoice = this.qbo.updateInvoice(data, function(err, inv) {
            if (err) {
                console.error("", err)
            } else {
                return inv
            }
        })
        return this.handleResponse(updatedInvoice)
    }

    handleResponse(resData: any): any {
        return InvoiceReadSchema.parse(rawData)
    }
}