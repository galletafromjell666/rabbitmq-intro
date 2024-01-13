const amqplib = require("amqplib");

class RabbitMQ {
  constructor(url, exchange, severityArr, messageHandler) {
    this.url = url;
    this.exchange = exchange;
    this.severityArr = severityArr
    /**
     * If we use an empty string as queue name,
     * we create a non-durable queue with a generated random name
     * by the server
     */
    this.queueName = "";
    this.messageHandler = messageHandler;
    this.queue = null;
  }

  async init() {
    this.connection = await amqplib.connect(this.url);
    this.channel = await this.connection.createChannel();
    this.channel.assertExchange(this.exchange, "direct", { durable: false });
    this.queue = await this.channel.assertQueue(this.queueName, {
      exclusive: true,
    });

    process.once("SIGINT", () => {
      this.connection.close();
    });
    return this;
  }

  async publish(msg, severity) {
    if (!this.connection) await this.init();
    this.channel.publish(this.exchange, severity, Buffer.from(msg));
  }

  async consume() {
    if (!this.connection) await this.init();
    /**
     * Channels accept a binding key as the third argument.
     * This binding key has a different meaning depending of the exchange type.
     * In this example we have a generic function to bind to different keys.
     */
    await Promise.all(
      this.severityArr.map(async (severity) => {
        await this.channel.bindQueue(this.queue.queue, this.exchange, severity);
      })
    );

    console.log("Listening for events");
    await this.channel.consume(this.queue.queue, this.messageHandler, {
      noAck: true,
    });
  }
}

module.exports = RabbitMQ;
