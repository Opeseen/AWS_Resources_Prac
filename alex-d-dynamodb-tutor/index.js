import { UpdateItemCommand, DynamoDBClient, TransactWriteItemsCommand,

  } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({});

const main1 = async () => {
  const TABLE_NAME = "Alex-Table2"
	const params = {
		TableName: TABLE_NAME,
		Key :{
      "PK": {"S":"Amazon"}
    },
		ConditionExpression: "contains(Admins, :user)",
    UpdateExpression: "SET SubscriptionType = :type",
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

// main1()

const main2 = async() => {
  const TABLE_NAME = "Alex-Table2"
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
          UpdateExpression: "SET SubscriptionType = :type",
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

// main2()

// Updating and Remove existing attributes.
const main3 = async () => {
  const TABLE_NAME = "Alex-Table1"
	const params = {
    Key :{
      "Actor": {"S":"Tom Hanks"},
      "Movie": {"S":"Cast Away"}
    },
    TableName: TABLE_NAME,
		UpdateExpression: "SET Genre = :genre, #r = :role REMOVE #y", 
    ExpressionAttributeNames:{
      "#r": "Role",
      "#y": "Year"
    },
		ExpressionAttributeValues: {
			":role": {"S": "Chucks"},
			":genre":{"S": "Poetry"}
		},
    ReturnValues: "ALL_NEW",
	};
	const command = new UpdateItemCommand(params);
  try {
    const response = await client.send(command);
    console.log(response);
  } catch (error) {
    console.log(error)
  }
};

// main3()


// Updating and Remove existing attribute and add new attribute.
const main4 = async () => {
  const TABLE_NAME = "Alex-Table1"
	const params = {
    Key :{
      "Actor": {"S":"Tom Hanks"},
      "Movie": {"S":"Cast Away"}
    },
    TableName: TABLE_NAME,
		UpdateExpression: "SET Genre = :genre, #d = :duration, #r = :role REMOVE #y", 
    ExpressionAttributeNames:{
      "#r": "Role",
      "#y": "Year",
      "#d": "Duration"
    },
		ExpressionAttributeValues: {
			":role": {"S": "Chucks"},
			":genre":{"S": "Poetry"},
      ":duration":{"S": "1hour"}
		},
    ReturnValues: "ALL_NEW",
	};
	const command = new UpdateItemCommand(params);
  try {
    const response = await client.send(command);
    console.log(response);
  } catch (error) {
    console.log(error)
  }
};
// main4()

// Updating and existing attribute and add new attribute.
const main5 = async () => {
  const TABLE_NAME = "Alex-Table1"
	const params = {
    Key :{
      "Actor": {"S":"Tom Hanks"},
      "Movie": {"S":"Cast Away"}
    },
    TableName: TABLE_NAME,
		UpdateExpression: "SET Genre = :genre, #y= :year, #d = :duration, #r = :role", 
    ExpressionAttributeNames:{
      "#r": "Role",
      "#y": "Year",
      "#d": "Duration"
    },
		ExpressionAttributeValues: {
			":role": {"S": "Chucks"},
			":genre":{"S": "Poetry"},
      ":duration":{"S": "2hour"},
      ":year":{"N": "2000"}
		},
    ReturnValues: "ALL_NEW",
	};
	const command = new UpdateItemCommand(params);
  try {
    const response = await client.send(command);
    console.log(response);
  } catch (error) {
    console.log(error)
  }
};
main5()