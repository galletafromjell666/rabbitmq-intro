const RabbitMQ = require("../RabbitMQ");
const { getCurrentDate } = require("../../utils/date");

const url = "amqp://localhost";
const exchange = "logs_routing";

const severityArr = process.argv.slice(2);

const onMessage = (msg) => {
  if (msg.content) {
    console.log(
      `${getCurrentDate()}: ${msg.content.toString()}\n\nRouting key ${
        msg.fields.routingKey
      }`
    );
  }
};
const rabbit = new RabbitMQ(url, exchange, severityArr, onMessage);

(async () => {
  await rabbit.consume();
})();
