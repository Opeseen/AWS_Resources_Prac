import { QueryCommand , DynamoDBClient } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({});
const TABLE_NAME = "Alex-Table1"

const main = async () => {
	const params = {
		TableName: TABLE_NAME,
		KeyConditionExpression:"Actor = :actor",
		ProjectionExpression: "Actor, Movie, #year, #role",
		// This is necessary for reserved keyword
		ExpressionAttributeNames:{
			"#year":"Year",
			"#role":"Role"
		},
		ExpressionAttributeValues: {
			":actor": {"S": "Tom Hanks"},
		},
	};
	const command = new QueryCommand(params);
	const response = await client.send(command);
	console.log(response.Items);
};

main()

