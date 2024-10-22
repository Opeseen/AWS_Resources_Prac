import { UpdateItemCommand, DynamoDBClient } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({});
const TABLE_NAME = "Alex-Table2"

const main = async () => {
	const params = {
		TableName: TABLE_NAME,
		Key :{
      "PK": {"S":"Amazon"},
    },
		// ConditionExpression: "contains(Admins, :user)",
		UpdateExpression: "set #subType = :type",
    ExpressionAttributeNames: {
      "#subType":"SubscriptionType",
      // "#user": "JeffBezos",
      // "#type": "Corporate"
    },
		ExpressionAttributeValues: {
      ":type": {"S":"Corporate"},
      // ":user": {"S":"JeffBezos"}
    },
    ReturnValues: "ALL_NEW",
	};
	const command = new UpdateItemCommand(params);
	const response = await client.send(command);
	console.log(response.Items);
};

main()

