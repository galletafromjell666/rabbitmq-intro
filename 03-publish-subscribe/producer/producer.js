const RabbitMQ = require("../RabbitMQ");
const { getCurrentDate } = require("../../utils/date");

const url = "amqp://localhost";
const exchange = "logs"

const consumer = new RabbitMQ(url, exchange);

const msg = process.argv.slice(2).join(' ') || "Hello World!";

(async () => {
  await consumer.publish(msg);
  console.log(`${getCurrentDate()}: Message sent!`);
})();
