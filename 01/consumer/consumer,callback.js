const amqp = require("amqplib/callback_api");
const { getCurrentDate } = require("../../utils/date");

amqp.connect("amqp://localhost", (error0, connection) => {
  if (error0) {
    throw error0;
  }
  connection.createChannel((error1, channel) => {
    if (error1) {
      throw error1;
    }

    const queue = "queue01";

    channel.assertQueue(queue, {
      durable: false,
    });

    console.log(`${getCurrentDate()} : Waiting messages on queue: ${queue}`);

    channel.consume(
      queue,
      (msg) => {
        console.log(
          `${getCurrentDate()}: Message received: ${msg.content.toString()}`
        );
      },
      {
        noAck: true,
      }
    );
  });
});
