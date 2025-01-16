
@Client({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'hero',
        brokers: ['localhost:9092'],
      },
      consumer: {
        groupId: 'hero-consumer'
      }
    }
  })
  client: ClientKafka;
  

@Controller
export class catClassLocation {
    @MessagePattern()
}