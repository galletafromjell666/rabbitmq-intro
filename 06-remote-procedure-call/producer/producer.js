const RabbitMQ = require("../RabbitMQ");
const { getCurrentDate } = require("../../utils/date");

const url = "amqp://localhost";
const queue = "rpc";



// We will calculate the fibonnaci sequence for this number
const fib = 10

const handleResponse = (msg) => {
  console.log(`Response received`, msg.content.toString())
}

const rabbit = new RabbitMQ(url, queue, handleResponse);

(async () => {
  console.log(`${getCurrentDate()} : Sending message: ${fib}`);
  await rabbit.publish(fib);
  await rabbit.consume()
})();
