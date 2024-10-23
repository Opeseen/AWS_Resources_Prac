import { UpdateItemCommand, DynamoDBClient, TransactWriteItemsCommand  } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({});
const TABLE_NAME = "Alex-Table2"

const main = async () => {
	const params = {
		TableName: TABLE_NAME,
		Key :{
      "PK": {"S":"Amazon"}
    },
		ConditionExpression: "contains(Admins, :user)",
    UpdateExpression: "set SubscriptionType = :type",
		ExpressionAttributeValues: {
      ":type": {"S":"Business"},
      ":user": {"S":"JeffBezos"}
    },
    ReturnValues: "ALL_NEW",
	};
	const command = new UpdateItemCommand(params);
	const response = await client.send(command);
	console.log(response);
};

// main()

const input = async() => {
  const params = {
    TransactItems: [
      {
        ConditionCheck:{
          Key:{
            "PK": {"S":"Amazon"}
          },
          TableName: TABLE_NAME,
          ConditionExpression: "contains(Admins, :user)",
          ExpressionAttributeValues: {
            ":user": {"S":"JeffBezos"}
          },
        }
      },
      {
        Update:{
          Key:{
            "PK": {"S":"Oracle"}
          },
          TableName: TABLE_NAME,
          UpdateExpression: "set SubscriptionType = :type",
          ExpressionAttributeValues:{
            ":type": {"S":"Paid"}
          },
          ReturnValuesOnConditionCheckFailure: "ALL_OLD" || "NONE",
        },
      }
    ]
  }
  const command = new TransactWriteItemsCommand(params);
  try {
    const response = await client.send(command);
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};

input()

