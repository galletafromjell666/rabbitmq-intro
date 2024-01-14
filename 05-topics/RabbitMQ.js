const amqplib = require("amqplib");

class RabbitMQ {
  constructor(url, exchange, topicsArr, messageHandler) {
    this.url = url;
    this.exchange = exchange;
    this.topicsArr = topicsArr
    this.queueName = "";
    this.messageHandler = messageHandler;
    this.queue = null;
  }

  async init() {
    this.connection = await amqplib.connect(this.url);
    this.channel = await this.connection.createChannel();
    this.channel.assertExchange(this.exchange, "topic", { durable: false });
    this.queue = await this.channel.assertQueue(this.queueName, {
      exclusive: true,
    });

    process.once("SIGINT", () => {
      this.connection.close();
    });
    return this;
  }

  async publish(msg, topic) {
    if (!this.connection) await this.init();
    this.channel.publish(this.exchange, topic, Buffer.from(msg));
  }

  async consume() {
    if (!this.connection) await this.init();
    /**
     * Channels accept a binding key as the third argument.
     * This binding key has a different meaning depending of the exchange type.
     * In this example we have a generic function to bind to different keys.
     */
    await Promise.all(
      this.topicsArr.map(async (topic) => {
        await this.channel.bindQueue(this.queue.queue, this.exchange, topic);
      })
    );

    console.log("Listening for events");
    await this.channel.consume(this.queue.queue, this.messageHandler, {
      noAck: true,
    });
  }
}

module.exports = RabbitMQ;
