const amqplib = require("amqplib");
const crypto = require("crypto");

class RabbitMQ {
  constructor(url, queue, messageHandler) {
    this.url = url;
    this.queue = queue;
    this.messageHandler = messageHandler;
    // Probably not the best way to do this but I'll work for this example.
    this.correlationId = null;
  }

  async init() {
    this.connection = await amqplib.connect(this.url);
    this.channel = await this.connection.createChannel();
    this.channel.assertQueue(this.queue, { durable: true });
    this.channel.prefetch(1);

    process.once("SIGINT", () => {
      this.connection.close();
    });
    return this;
  }

  async publish(msg) {
    if (!this.connection) await this.init();
    this.correlationId = crypto.randomUUID();
    this.channel.sendToQueue(this.queue, Buffer.from(msg.toString()), {
      correlationId: this.correlationId,
      replyTo: this.queue,
    });
  }

  async remoteFunction() {
    if (!this.connection) await this.init();
    console.log("Listening for remote procedure calls")
    await this.channel.consume(this.queue, (msg) => {
      const n = parseInt(msg.content.toString());
      console.log(`Calculating fibonacci for ${n}`);
      const result = fibonacci(n);

      this.channel.sendToQueue(
        msg.properties.replyTo,
        Buffer.from(result.toString()),
        {
          correlationId: msg.properties.correlationId,
        }
      );
      this.channel.ack(msg);
    });
  }

  async consume() {
    if (!this.connection) await this.init();
    console.log("Listening for events");
    await this.channel.consume(
      this.queue,
      (msg) => {
        // Only execute the handler if is our correlationId
        if (msg.properties.correlationId === this.correlationId) {
          this.messageHandler(msg);
        }
      },
      {
        noAck: true,
      }
    );
  }
}

module.exports = RabbitMQ;

function fibonacci(n) {
  if (n < 2) return n;
  else return fibonacci(n - 1) + fibonacci(n - 2);
}
