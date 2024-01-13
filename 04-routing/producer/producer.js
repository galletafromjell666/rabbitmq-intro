const RabbitMQ = require("../RabbitMQ");
const { getCurrentDate } = require("../../utils/date");

const url = "amqp://localhost";
const exchange = "logs_routing";

const rabbit = new RabbitMQ(url, exchange);

const args = process.argv.slice(2);

const msg = args.slice(1).join(" ") || "Hello World!";
const severity = args.length > 0 ? args[0] : "info";

(async () => {
  await rabbit.publish(msg, severity);
  console.log(`${getCurrentDate()}: Message sent -- severity: ${severity}`);
})();
