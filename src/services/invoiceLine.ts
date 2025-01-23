import { Injectable } from "@nestjs/common"
import { LeasedLocationCode, LicensedLocationCode } from "../types/ts-location"
import { InvoiceLine, InvoiceLineSalesItemRefValueSchema } from "../types/qbo-api-response"
import { FulfillmentProductItemRefValue, SpaceProductItemRefValue } from "../types/ts-product-cat"

export class InvoiceLineClassFind {
    private locationId: string
    private line: InvoiceLine
    private itemRefValue: string

    constructor(
        line: InvoiceLine
    ) {}

    extractTarget() {
        this.itemRefValue = InvoiceLineSalesItemRefValueSchema.parse(this.line)
    }

    translateTarget() {
        if (SpaceProductItemRefValue.safeParse(this.itemRefValue).success) {
            if (LeasedLocationCode.safeParse(this.itemRefValue).success) {

            } else if (LicensedLocationCode.safeParse(this.itemRefValue).success) {

            } else {

            }
        } else if (FulfillmentProductItemRefValue.safeParse(this.itemRefValue).success) {

        } else if () {
            
        }
    }


}
