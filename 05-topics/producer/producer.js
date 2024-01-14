const RabbitMQ = require("../RabbitMQ");
const { getCurrentDate } = require("../../utils/date");

const url = "amqp://localhost";
const exchange = "logs_routing_topic";

const args = process.argv.slice(2);

if (args.length == 0) {
  console.log("Usage: producer.js <key> <message>");
  /**
   * E.g: node producer.js "kern.otherKey" "Oh no!: Kernel Error"
   */
  process.exit(1);
}

const rabbit = new RabbitMQ(url, exchange);


const msg = args.slice(1).join(" ") || "Hello World!";
const severity = args.length > 0 ? args[0] : "info";

(async () => {
  await rabbit.publish(msg, severity);
  console.log(`${getCurrentDate()}: Message sent -- severity: ${severity}`);
})();
