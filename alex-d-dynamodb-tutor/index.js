import { UpdateItemCommand, DynamoDBClient, TransactWriteItemsCommand} 
  from "@aws-sdk/client-dynamodb";
import {QueryCommand, UpdateCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

const run = async () => {
  const TABLE_NAME = "Alex-Table1"
	const params = {
		TableName: TABLE_NAME,
		KeyConditionExpression:"Actor = :actor",
		FilterExpression:"Genre = :genre",
		ExpressionAttributeValues: {
			":actor": "Tom Hanks",
			":genre": "Poetry"
		},
	};
	const command = new QueryCommand(params);
	const response = await docClient.send(command);
	console.log(response.Items);
};

// run()

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
// main5()

// Updating and existing attribute and add new attribute...Using the document client model
const main6 = async () => {
  const TABLE_NAME = "Alex-Table1"
	const params = {
    Key :{
      "Actor": "Tim Allen",
      "Movie": "Toy Story"
    },
    TableName: TABLE_NAME,
		UpdateExpression: "SET Genre = :genre, #y= :year, #d = :duration, #r = :role", 
    ExpressionAttributeNames:{
      "#r": "Role",
      "#y": "Year",
      "#d": "Duration"
    },
		ExpressionAttributeValues: {
			":role": "Scientist",
			":genre": "Adult",
      ":duration": "4hour",
      ":year": 1998
		},
    ReturnValues: "ALL_NEW",
	};
	const command = new UpdateCommand(params);
  try {
    const response = await client.send(command);
    console.log(response);
  } catch (error) {
    console.log(error)
  }
};

// main6()


// Incrementing Values
const main7 = async () => {
  const TABLE_NAME = "Alex-Table1"
	const params = {
    Key :{
      "Actor": "Tim Allen",
      "Movie": "Toy Story"
    },
    TableName: TABLE_NAME,
		UpdateExpression: "SET Genre = :genre, #y= #y + :inc, #d = :duration, #r = :role", 
    ExpressionAttributeNames:{
      "#r": "Role",
      "#y": "Year",
      "#d": "Duration"
    },
		ExpressionAttributeValues: {
			":role": "Scientist",
			":genre": "Adult",
      ":duration": "4hour",
      ":inc": 20
		},
    ReturnValues: "ALL_NEW",
	};
	const command = new UpdateCommand(params);
  try {
    const response = await client.send(command);
    console.log(response);
  } catch (error) {
    console.log(error)
  }
};

main7()