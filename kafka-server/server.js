import { ConnectionProvider } from "./kafka/connection.js";
import mongoose from "mongoose";
import question from "./services/question.js";

try {
	mongoose.connect("mongodb+srv://SnigdhaAWSMongo:AWSPa$$wordMongo@cluster0.fj6vo.mongodb.net/stackoverflow_scratch?retryWrites=true&w=majority", {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		maxPoolSize: 500,
	});
	console.log("Mongoose is connected!");
} catch (err) {
	console.error("Could not connect Mongoose => ", err);
}

const handleTopicRequest = (topicName,functionName) => {
	const connection = new ConnectionProvider();
	const consumer = connection.getConsumer(topicName);
	const producer = connection.getProducer();

	console.log("Kafka server is running!");

	consumer.on("message", (message) => {
		console.log("Message received for => ", topicName);
		console.log("Incoming message: ", message);
		const data = JSON.parse(message.value);

		functionName(data.data, (err, res) => {
			const payloads = [
				{
					topic: data.replyTo,
					messages: JSON.stringify({
						correlationId: data.correlationId,
						data: res,
					}),
					partition: 0,
				},
			];

			producer.send(payloads, (err, data) => {
				console.log("Payload sent back to producer => ", data);
			});
			return;
		});
	});
};

handleTopicRequest("question_topic",question);
