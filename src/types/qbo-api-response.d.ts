import { z } from "zod"

export const InvoiceLineSchema = z.object({
    Id: z.string(),
    Description: z.string(),
    SalesItemLineDetail: z.object({
        ItemRef: z.object({
            value: z.string(),
            name: z.string()
        })
    })
})

export const InvoiceReadSchema = z.object({
    Invoice: z.object({
        Id: z.string(),
        DocNumber: z.string(),
        Line: z.array(InvoiceLine)
    }),
    time: z.string()
})

export type InvoiceRead = z.infer<typeof InvoiceReadSchema>

export const TargetLocationStringSchema = InvoiceReadSchema.transform((data) => (
    data.Invoice.DocNumber
))

export type TargetLocationString = z.infer<typeof TargetLocationStringSchema>

export const InvoiceSalesLinesSchema = InvoiceReadSchema.transform((data) => (
    data.Invoice.Line
))

export type InvoiceSalesLines = z.infer<typeof InvoiceSalesLinesSchema>

export type InvoiceLine = z.infer<typeof InvoiceLineSchema>

export const InvoiceLineSalesItemRefValueSchema = InvoiceLineSchema.transform((data) => (
    data.SalesItemLineDetail.ItemRef.value
))