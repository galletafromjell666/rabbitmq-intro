## Direct Exchanges + Routing

Direct exchanges act as precise message routers in RabbitMQ. They deliver messages only to queues with matching routing keys, ensuring one-on-one delivery.

![RabbitMQ DirectExchange](https://github.com/galletafromjell666/rabbitmq-intro/blob/c9e9fc279deeb7923f73e071f4ba6db22b90c209/04/04.png)

### Key points

- Function: Route messages to specific queues based on matching routing keys.
- Use case: Ideal for scenarios requiring direct delivery to a single queue.
- Routing keys: Act as unique identifiers attached to messages, dictating their destination.
- Queue bindings: Link queues to a specific exchange and routing key, defining designated delivery paths.
