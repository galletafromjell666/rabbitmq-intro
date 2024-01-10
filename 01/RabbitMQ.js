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
    this.channel.assertQueue(this.queue, { durable: false });

    // Gracefully close the connection when ctrl + c 
    process.once("SIGINT", () => {
      this.connection.close();
    });
    /* Returning this from a method allows for method chaining, 
    a technique where you can call multiple methods on the same object in a single expression.
    
    E.g:
        const broker = new MessageBroker().init().publish('hello');

    is Equivalent to:
        const broker = new MessageBroker();
        broker.init();
        broker.consume('hello'); */
    return this;
  }

  async publish(msg) {
    if (!this.connection) await this.init();
    this.channel.sendToQueue(this.queue, Buffer.from(msg));
  }

  async consume() {
    if (!this.connection) await this.init();
    console.log("Listening for events");
    await this.channel.consume(this.queue, this.messageHandler);
  }
}

module.exports = RabbitMQ;
