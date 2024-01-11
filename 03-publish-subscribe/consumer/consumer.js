const RabbitMQ = require("../RabbitMQ");
const { getCurrentDate } = require("../../utils/date");

const url = "amqp://localhost";
const exchange = "logs";

const onMessage = (msg) => {
  if (msg.content) {
    console.log(`${getCurrentDate()}: ${msg.content.toString()}`);
  }
};
const consumer = new RabbitMQ(url, exchange, onMessage);

(async () => {
  await consumer.consume();
})();
