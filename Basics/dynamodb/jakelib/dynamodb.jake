/* ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** **
Filename: aws.jake
Date: 3/31/17
Author: Chris Mendez http://chrisjmendez.com
Dashboard Console: https://console.aws.amazon.com/dynamodb/home
Docs: http://docs.aws.amazon.com/amazondynamodb/latest/gettingstartedguide/GettingStarted.NodeJs.02.html
Description:
	
* ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** **/
var util = require('util');
var AWS  = require("aws-sdk");
var fs   = require('fs');

namespace('dynamodb', function () {	

	//A. Declare where your DB is located.
	AWS.config.update({
		region: "us-west-2",
		endpoint: "http://localhost:8000"
	});


	desc('Create a DynamoDB table.');
	task('create', ['aws:loadCredentials'], { async: true }, function(tableName) {
		var dynamodb = new AWS.DynamoDB();
		//TODO: You will need to modify this schema to fit your document.
		var params = {
			TableName : tableName,
			KeySchema: [       
				{ AttributeName: "year", KeyType: "HASH"},  //Partition key
				{ AttributeName: "title", KeyType: "RANGE" }  //Sort key
			],
			AttributeDefinitions: [       
				{ AttributeName: "year", AttributeType: "N" },
				{ AttributeName: "title", AttributeType: "S" }
			],
			ProvisionedThroughput: {       
				ReadCapacityUnits: 10, 
				WriteCapacityUnits: 10
			}
		};

		dynamodb.createTable(params, function(err, data) {
			if (err) {
				console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
			} else {
				console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
			}
		});
	
	});

	
	desc('Upload a JSON file to Dynamo DB. dynamodb:load[table_name,/path/to/file.json]');
	task('load', ['aws:loadCredentials'], { async: true }, function(table_name, json) {
		var docClient = new AWS.DynamoDB.DocumentClient();
		console.log("Importing movies into DynamoDB. Please wait.");
		//TODO: You will need to modify this to fit your schema document
		var allMovies = JSON.parse(fs.readFileSync(json, 'utf8'));
		allMovies.forEach(function(movie) {
			var params = {
				TableName: "Movies",
				Item: {
					"year":  movie.year,
					"title": movie.title,
					"info":  movie.info
				}
			};
			docClient.put(params, function(err, data) {
				if (err) {
					console.error("Unable to add movie", movie.title, ". Error JSON:", JSON.stringify(err, null, 2));
				} else {
					console.log("PutItem succeeded:", movie.title);
				}
			});
		});
	
	});
	

	desc('Upload a JSON file to Dynamo DB. dynamodb:load[table_name,/path/to/file.json]');
	task('loadNew', ['aws:loadCredentials'], { async: true }, function(table_name, json) {
		var docClient = new AWS.DynamoDB.DocumentClient();

		console.log("Importing JSON into DynamoDB. Please wait.");

		var json = JSON.parse(fs.readFileSync(json, 'utf8'));
		json.forEach(function(object) {
			var params = {
				TableName: table_name,
				Item: object
			};

			docClient.put(params, function(err, data) {
				if (err) {
					console.error("Unable to add object", object.make, object.model, ". Error JSON:", JSON.stringify(err, null, 2));
				} else {
					console.log("PutItem succeeded:", object.make, object.model);
				}
			});
		});
	});	
	
	desc('Query all based on year and title');
	task('query', ['aws:checkProfile'], { async: true }, function(table_name, json) {
		var docClient = new AWS.DynamoDB.DocumentClient();

		console.log("Querying for movies from 1992 - titles A-L, with genres and lead actor");
		var params = {
			TableName : "Movies",
			ProjectionExpression:"#yr, title, info.genres, info.actors[0]",
			KeyConditionExpression: "#yr = :yyyy and title between :letter1 and :letter2",
			ExpressionAttributeNames:{
				"#yr": "year"
			},
			ExpressionAttributeValues: {
				":yyyy":1992,
				":letter1": "A",
				":letter2": "L"
			}
		};
		docClient.query(params, function(err, data) {
			if (err) {
				console.log("Unable to query. Error:", JSON.stringify(err, null, 2));
			} else {
				console.log("Query succeeded.");
				data.Items.forEach(function(item) {
					console.log(" -", item.year + ": " + item.title
					+ " ... " + item.info.genres
					+ " ... " + item.info.actors[0]);
				});
			}
		});
	});		
});

