const amqplib = require("amqplib");

class RabbitMQ {
  constructor(url, queue, messageHandler) {
    this.url = url;
    this.queue = queue;
    this.messageHandler = messageHandler;
  }

  async init() {
    this.connection = await amqplib.connect(this.url);
    this.channel = await this.connection.createChannel();
    /**
     * The resilience of durable entities lies in their automatic regeneration after a server restart.
     */
    this.channel.assertQueue(this.queue, { durable: true });
    // This tells RabbitMQ not to give more than one message to a worker at a time.
    this.channel.prefetch(1)

    process.once("SIGINT", () => {
      this.connection.close();
    });
    return this;
  }

  async publish(msg) {
    if (!this.connection) await this.init();
    this.channel.sendToQueue(this.queue, Buffer.from(msg), {
      /*
      * Persist messages to disk, and thus survive a server restart, 
      * you need to publish to a durable exchange, the receiving queue has to be durable.
      */
      persistent: true,
    });
  }

  async consume() {
    if (!this.connection) await this.init();
    console.log("Listening for events");
    await this.channel.consume(this.queue, this.messageHandler, {
      /**
       * Consumer's "ack" message informs RabbitMQ of successful message processing, enabling deletion from the queue.
       */
      noAck: true,
    });
  }
}

module.exports = RabbitMQ;
