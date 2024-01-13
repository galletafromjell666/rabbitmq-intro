const RabbitMQ = require("../RabbitMQ");
const { getCurrentDate } = require("../../utils/date");

const url = "amqp://localhost";
const queue = "queue02";

const rabbit = new RabbitMQ(url, queue);

const msg = process.argv.slice(2).join(' ') || "Hello World!";

(async () => {
  console.log(`${getCurrentDate()} : Sending message: ${msg}`);
  await rabbit.publish(msg);
})();
