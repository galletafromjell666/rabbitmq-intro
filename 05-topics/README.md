## Topic Exchange
While the direct exchange served its purpose well, it falls short when it comes to routing based on multiple criteria. Messages sent to a topic exchange don't utilize a routing key; instead, they adopt a list of words delimited by dots. For instance, raccon.animal.white or fox.animal.orange. The binding mechanism operates in a similar fashion.
E.g, `raccon.animal.white` or `fox.animal.orange`.


![RabbitMQ Topic Exchange](https://github.com/galletafromjell666/rabbitmq-intro/blob/898cad9f861a6e341f468089cb2d13400cb9f249/05/topic%20exchange.png)

The topic exchange's logic closely resembles that of the direct exchange. A message sent with a particular routing key will be delivered to all queues bound with a matching binding key.

### Special Key Bindings
- *⁠ (star) can substitute for exactly one word.
- #⁠ (hash) can substitute for zero or more words.

## Topic Exchange Simulates Other Exchanges

The topic exchange exhibits versatility and can emulate the behavior of other exchanges.
When a queue is bound with a "#" (hash) binding key, it receives all messages, regardless of the routing key, similar to a fanout exchange.
If special characters "*" (star) and "#" (hash) are not used in bindings, the topic exchange behaves just like a direct one.
