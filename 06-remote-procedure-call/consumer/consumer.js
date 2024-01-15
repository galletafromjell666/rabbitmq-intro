const RabbitMQ = require("../RabbitMQ");
const { getCurrentDate } = require("../../utils/date");

const url = "amqp://localhost";
const queue = "rpc";


const rabbit = new RabbitMQ(url, queue);

(async () => {
  await rabbit.remoteFunction();
})();
