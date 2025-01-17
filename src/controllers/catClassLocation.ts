import { Controller } from '@nestjs/common';
import { EventPattern, Payload, Ctx, KafkaContext } from '@nestjs/microservices';
  

@Controller
export class catClassLocation {

    constructor(private invoiceRetriever: InvoiceRetrieval) {}

    @EventPattern('invoice.created')
    handle(@Payload() data: any) {
      invoiceData = this.invoiceRetriever.call(data)
    }
}