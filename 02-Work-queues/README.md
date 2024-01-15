To guarantee that a message survives a server restart, the message needs to be:
- Declared as a persistent message.
- Published into a durable exchange.
- Queued into a durable queue.
