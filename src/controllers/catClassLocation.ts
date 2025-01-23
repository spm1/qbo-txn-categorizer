import { Controller } from '@nestjs/common';
import { EventPattern, Payload, Ctx, KafkaContext } from '@nestjs/microservices';
import { InvoiceRetrieval } from '../services/invoiceRetrieval'
import { LocationFind } from '../services/locationFind';
import { ClassFind } from '../services/classFind';
import { InvoiceSalesLinesSchema } from '../types/qbo-api-response';
  

@Controller
export class catClassLocation {

    constructor(
      private invoiceRetriever: InvoiceRetrieval,
      private locationFinder: LocationFind,
      private classFinder: ClassFind
    ) {}

    @EventPattern('invoice.created')
    handle(@Payload() data: any) {
      const invoiceData = this.invoiceRetriever.call(data)
      const qboLocationId = this.locationFinder.call(invoiceData)
      const salesLines = InvoiceSalesLinesSchema.parse(invoiceData)
    }
}