## Exchange types
1. Direct Exchange:

    * Delivers messages to specifically named queues based on their routing key.
    * Ensures targeted message delivery to intended recipients.

2. Fanout Exchange:

    * Broadcasts all messages to every connected queue.
    * Ideal for distributing information to all consumers simultaneously.

3. Topic Exchange:

    * Routes messages based on patterns within the routing key.
    * Allows flexible routing by defining subscription patterns.
    * Enables multiple queues to receive the same message if their patterns match.

4. Headers Exchange:

    * Routes messages based on arbitrary headers attached to the message.
    * Facilitates fine-grained control based on message attributes.
    * Requires defining and matching specific headers for routing.

5. Default Exchange:

    * Catch-all exchange for messages without an explicit destination.
    * Routing key is an empty string.
    * Often used for temporary communication or testing.

6. Dead Letter Exchange (DLX):

    * Handles unroutable or rejected messages.
    * Acts as a safety net for messages that cannot be delivered or processed.
    * Allows for analysis and potential reprocessing attempts.

---

List bingings between queues and exchanges:
```
rabbitmqctl list_bindings
```
 