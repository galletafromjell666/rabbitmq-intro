const RabbitMQ = require("../RabbitMQ");
const { getCurrentDate } = require("../../utils/date");

const url = "amqp://localhost";
const queue = "queue01";
const onMessage = (msg) => {
  console.log(
    `${getCurrentDate()}: Message Received: ${msg.content.toString()}`
  );
};
const rabbit = new RabbitMQ(url, queue, onMessage);

(async () => {
	await rabbit.consume();
})();
