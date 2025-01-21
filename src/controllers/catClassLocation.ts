import { Controller } from '@nestjs/common';
import { EventPattern, Payload, Ctx, KafkaContext } from '@nestjs/microservices';
import { InvoiceRetrieval } from '../services/invoiceRetrieval'
import { LocationFind } from '../services/locationFind';
import { ClassFind } from 'src/services/classFind';
  

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
    }
}