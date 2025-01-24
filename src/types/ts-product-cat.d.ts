import { z } from 'zod'

export const SpaceProductItemRefValue = z.enum(["191"])
export const FulfillmentProductItemRefValue = z.enum([])
export const ForkliftLabourProductItemRefValue = z.enum([])
export const CapitalProductItemRefValue = z.enum([])
export const MoveOutProductItemRefValue = z.enum([])
export const RebilledLabourProductItemRefValue = z.enum([])

export const ValidProductItemRefValue = z.union([
    SpaceProductItemRefValue,
    FulfillmentProductItemRefValue,
    ForkliftLabourProductItemRefValue,
    CapitalProductItemRefValue,
    MoveOutProductItemRefValue,
    RebilledLabourProductItemRefValue
])

export const ProductClassNameSchema = z.enum([
    "SpaceProduct",
    "Fulfillment",
    "ForkliftLabour",
    "CapitalProduct",
    "MoveOut", 
    "RebilledLabour"
])

export const ProductClassNameMap: Record<string, string> = {}

for (const v of SpaceProductItemRefValue.options) {
    ProductClassNameMap[v] = "SpaceProduct"
}

for (const v of FulfillmentProductItemRefValue.options) {
    ProductClassNameMap[v] = "Fulfillment"
}

for (const v of ForkliftLabourProductItemRefValue.options) {
    ProductClassNameMap[v] = "ForkliftLabour"
}

for (const v of CapitalProductItemRefValue.options) {
    ProductClassNameMap[v] = "CapitalProduct"
}

for (const v of MoveOutProductItemRefValue.options) {
    ProductClassNameMap[v] = "MoveOut"
}

for (const v of RebilledLabourProductItemRefValue.options) {
    ProductClassNameMap[v] = "RebilledLabour"
}

export const ProductClassValueMap: Record<string, string> = {
    "LeasedSpaceProduct": "",
    "LicensedSpaceProduct": "",
    "Fulfillment": "",
    "ForkliftLabour": "",
    "CapitalProduct": "",
    "MoveOut": "",
    "RebilledLabour": ""
}

export const SpaceProductClassValueMap: Record<string, string> = {
    "Leased": "",
    "Licensed": ""
}

export readonly const UnknownClassValue = ""
export readonly const SpaceProductUnknownClassValue = ""




