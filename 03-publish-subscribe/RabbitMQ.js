const amqplib = require("amqplib");

class RabbitMQ {
  constructor(url, exchange, messageHandler) {
    this.url = url;
    this.exchange = exchange;
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
    console.log("this.exchange", this.exchange)
    this.channel.assertExchange(this.exchange,'fanout' ,{ durable: false });
    this.queue = await this.channel.assertQueue(this.queueName, {
      exclusive: true,
    });

    process.once("SIGINT", () => {
      this.connection.close();
    });
    return this;
  }

  async publish(msg) {
    if (!this.connection) await this.init();
    this.channel.publish(this.exchange, this.queueName, Buffer.from(msg));
  }

  async consume() {
    if (!this.connection) await this.init();
    await this.channel.bindQueue(
      this.queue.queue,
      this.exchange,
      ''
    );

    console.log("Listening for events");
    await this.channel.consume(
      this.queue.queue,
      this.messageHandler,
      {
        noAck: true,
      }
    );
  }
}

module.exports = RabbitMQ;
