import { z } from "zod"

export const InvoiceReadSchema = z.object({
    Invoice: z.object({
        Id: z.string(),
        DocNumber: z.string(),
        Line: z.array(z.object({
            Id: z.string(),
            Description: z.string(),
            SalesItemLineDetail: z.object({
                ItemRef: z.object({
                    value: z.string(),
                    name: z.string()
                })
            })
        }))
    }),
    time: z.string()
})

export type InvoiceRead = z.infer<typeof InvoiceReadSchema>

export const TargetLocationStringSchema = InvoiceReadSchema.transform((data) => (
    data.Invoice.DocNumber
))

export type TargetLocationString = z.infer<typeof TargetLocationStringSchema>