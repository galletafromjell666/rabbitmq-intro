## rabbitmq-intro 
[![License: MPL 2.0](https://img.shields.io/badge/License-MPL_2.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)

Welcome to my repo! These notes are a personal compilation crafted during my exploration of RabbitMQ.


### Topics Covered

- Publisher/Subscribe
Learn about the classic publish/subscribe pattern, where a message is broadcasted to multiple consumers. Understand how this pattern enhances the scalability and flexibility of your messaging system.

- Work Queues
Explore the concept of work queues and discover how to distribute time-consuming tasks among multiple workers. This helps balance the workload and ensures efficient task execution.

- Direct Exchange
Dive into the direct exchange, a versatile mechanism for routing messages based on a defined routing key. Understand how to implement precise message routing in your RabbitMQ setup.

<p align="center">
  <img src="https://github.com/galletafromjell666/rabbitmq-intro/blob/c9e9fc279deeb7923f73e071f4ba6db22b90c209/04/04.png">
</p>


- Topic Exchange
Uncover the power of the topic exchange, allowing messages to be routed using wildcard matches. Learn how to use this exchange type for more advanced and flexible routing scenarios.

<p align="center">
  <img src="https://github.com/galletafromjell666/rabbitmq-intro/blob/898cad9f861a6e341f468089cb2d13400cb9f249/05/topic%20exchange.png">
</p>


## How to Use This Repository
Feel free to explore the folders and demos in this repository. Each topic has a small demo, with most of them being similar to their previous counterparts. However, I decided not to share code between demos to clearly highlight new topics. Additionally, I've introduced comments explaining what is new.

## Getting Started
To get started, ensure that you have Docker, Node.js, and npm installed on your system.

1. Clone this repository.
2. Navigate to the repository directory.
3. Run ```npm install```.
4. Run the following Docker command to set up RabbitMQ:
```bash
docker run -d -p 15672:15672 -p 5672:5672 -p 5671:5671 --hostname rabbitmq --name rabbitmq-container rabbitmq:3-management
```
5. Move to any topic and start both the producer and consumer using:
   - For the consumer: node consumer.js
   - For the producer: node producer.js

Happy messaging! 🐰
