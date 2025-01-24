import { Controller } from '@nestjs/common';
import { EventPattern, Payload, Ctx, KafkaContext } from '@nestjs/microservices';
import { InvoiceRetrieval } from '../services/invoiceRetrieval'
import { LocationFind } from '../services/locationFind';
import { ClassFind } from '../services/classFind';
import { InvoiceRead, InvoiceSalesLines, InvoiceSalesLinesSchema } from '../types/qbo-api-response';
import { LocationId } from 'src/types/ts-location';
import { InvoiceFullUpdate } from 'src/services/invoiceUpdate';
  

@Controller
export class catClassLocation {
    private classFinder: ClassFind
    private locationId: LocationId
    private lines: InvoiceSalesLines

    constructor(
      private invoiceRetriever: InvoiceRetrieval,
      private locationFinder: LocationFind,
      private invoiceUpdater: InvoiceFullUpdate
    ) {}

    reassembleInvoice(invoice: InvoiceRead, locationId: LocationId, updatedLines: InvoiceSalesLines): InvoiceRead {
      invoice.Invoice.DepartmentRef = {
        value: locationId
      }
      invoice.Invoice.Line = updatedLines
      return invoice
    }

    @EventPattern('invoice.created')
    handle(@Payload() data: any) {
      var invoiceData = this.invoiceRetriever.call(data)
      const qboLocationId = this.locationFinder.call(invoiceData)
      const salesLines = InvoiceSalesLinesSchema.parse(invoiceData)
      this.classFinder = new ClassFind(qboLocationId, salesLines)
      const updatedLines = this.classFinder.call()
      invoiceData = this.reassembleInvoice(invoiceData, qboLocationId, updatedLines)
      this.invoiceUpdater.call(invoiceData)
      //how to handle Kafka
    }
}