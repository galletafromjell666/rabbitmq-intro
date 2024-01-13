const RabbitMQ = require("../RabbitMQ");
const { getCurrentDate } = require("../../utils/date");

const url = "amqp://localhost";
const queue = "queue01";

const rabbit = new RabbitMQ(url, queue);

const msg = "Hello! Testing publish method";

(async () => {
  console.log(`${getCurrentDate()} : Sending message: ${msg}`);
  await rabbit.publish(msg);
})();
