const amqp = require("amqplib");
const { getCurrentDate } = require("../../utils/date");

const queue = "queue01";

async function start() {
  const connection = await amqp.connect("amqp://localhost");
  const channel = await connection.createChannel();
  return channel;
}

async function consume(handler) {
  try {
    const channel = await start();
    await channel.assertQueue(queue, { durable: false });

    // receiving message
    await channel.consume(queue, handler);
    console.log("Consumer listetning for events");
  } catch (e) {
    console.log("Oh no!", e);
  }
}

const messageHandler = (msg) => {
  console.log(
    `${getCurrentDate()}: Message Received: ${msg.content.toString()}`
  );
};

consume(messageHandler);
