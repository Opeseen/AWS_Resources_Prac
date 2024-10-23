import { UpdateItemCommand, DynamoDBClient } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({});
const TABLE_NAME = "Alex-Table2"

const main = async () => {
	const params = {
		TableName: TABLE_NAME,
		Key :{
      "PK": {"S":"Amazon"},
    },
		ConditionExpression: "contains(Admins, :user)",
    ExpressionAttributeNames: {
      "#subType":"SubscriptionType",
      // "#user": "JeffBezos",
      // "#type": "Corporate"
    },
		ExpressionAttributeValues: {
      ":type": {"S":"Corporated"},
      ":user": {"S":"JeffBezos"}
    },
		UpdateExpression: "SET #subType = :type",
    ReturnValues: "ALL_NEW",
	};
	const command = new UpdateItemCommand(params);
	const response = await client.send(command);
	console.log(response);
};

main()

