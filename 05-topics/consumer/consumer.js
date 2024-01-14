const RabbitMQ = require("../RabbitMQ");
const { getCurrentDate } = require("../../utils/date");

const url = "amqp://localhost";
const exchange = "logs_routing_topic";

const topicsArr = process.argv.slice(2);

if (topicsArr.length == 0) {
  console.log("Usage: receive_logs_topic.js <facility>.<severity>");
  /**
   * E.g: node consumer.js "kern.*" "*.critical"
   */
  process.exit(1);
}


const onMessage = (msg) => {
  if (msg.content) {
    console.log(
      `${getCurrentDate()}: ${msg.content.toString()}\n\nRouting key ${
        msg.fields.routingKey
      }`
    );
  }
};
const rabbit = new RabbitMQ(url, exchange, topicsArr, onMessage);

(async () => {
  await rabbit.consume();
})();
