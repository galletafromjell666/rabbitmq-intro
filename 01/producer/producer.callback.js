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
    const msg = "Hello There";

    channel.assertQueue(queue, {
      durable: false,
    });
    channel.sendToQueue(queue, Buffer.from(msg));
    console.log(`${getCurrentDate()} : Sending message: ${msg}`);
  });

  // connection.close();
});
