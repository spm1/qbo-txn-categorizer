import { Injectable } from "@nestjs/common"
import { LeasedLocationId, LicensedLocationId, LocationClassNameMap, LocationClassNameSchema, LocationIdSchema } from "../types/ts-location"
import { InvoiceLine, InvoiceLineSalesItemRefValueSchema } from "../types/qbo-api-response"
import { CapitalProductItemRefValue, 
    ForkliftLabourProductItemRefValue, 
    FulfillmentProductItemRefValue, 
    MoveOutProductItemRefValue, 
    ProductClassNameMap, 
    ProductClassNameSchema, 
    ProductClassValueMap, 
    RebilledLabourProductItemRefValue, 
    SpaceProductClassValueMap, 
    SpaceProductItemRefValue, 
    SpaceProductUnknownClassValue, 
    UnknownClassValue } from "../types/ts-product-cat"

    /* Determines QBO Invoice Line Class */
@Injectable
export class InvoiceLineClassFind {
    private locationId: string
    private line: InvoiceLine
    private itemRefValue: string
    private classValue: any
    private processedLine: InvoiceLine

    constructor(
        locationId: string,
        line: InvoiceLine
    ) {}

    extractTarget() {
        this.itemRefValue = InvoiceLineSalesItemRefValueSchema.parse(this.line)
    }

    translateTarget() {
        const className = ProductClassNameMap[this.itemRefValue]
        
        if (ProductClassNameSchema.safeParse(className).success) {

            if (className == "SpaceProduct") {
                
                if (LocationIdSchema.safeParse(this.locationId).success) {

                    const locationClassName = LocationClassNameMap[this.locationId]
                    if (LocationClassNameSchema.safeParse(locationClassName).success) {
                        this.classValue = SpaceProductClassValueMap[locationClassName]
                    }

                } else {
                    this.classValue = SpaceProductUnknownClassValue
                }

            } else {
                this.classValue = ProductClassValueMap[className]
            }

        } else {
            this.classValue = UnknownClassValue
        }
    }

    call(): string {
        this.extractTarget()
        this.translateTarget()
        return this.classValue
    }


}
