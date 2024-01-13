const RabbitMQ = require("../RabbitMQ");
const { getCurrentDate } = require("../../utils/date");

const url = "amqp://localhost";
/*
 * RabbitMQ does not allow to rename queues or change queue properties,
 * to change something in the queue, you have to remove it and re-create.
 * That is why where usign a new queue here.
 */
const queue = "queue02";

const onMessage = (msg) => {
  const delay = msg.content.toString().split(".").length - 1;
  console.log(
    `${getCurrentDate()}: Message Received: ${msg.content.toString()} Start working on it`
  );
  setTimeout(() => {
    console.log(
        `${getCurrentDate()}: Work completed!`
      );
  }, 1000 * (delay ?? 1));
};
const rabbit = new RabbitMQ(url, queue, onMessage);

(async () => {
  await rabbit.consume();
})();
