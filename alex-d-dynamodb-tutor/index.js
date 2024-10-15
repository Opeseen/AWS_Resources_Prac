import { ScanCommand , DynamoDBClient } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({});
const TABLE_NAME = "Chat-Conversationss"
const main = async () => {
	const params = {
		TableName: TABLE_NAME,
	};
	const command = new ScanCommand(params);
	const response = await client.send(command);
	console.log(response);
};

main()

