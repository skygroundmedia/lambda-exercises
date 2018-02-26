/* ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** **
Filename: lambda.jake
Date: 8/07/17
Author: Chris Mendez http://chrisjmendez.com

* ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** **/
var util  = require('util');
var S3    = require('aws-sdk');

// Look at the .env to see where this is coming from
var config = { profile: process.env.AWSCLI_PROFILE }

namespace('lambda', function () {
	/* ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** **
	AWS Command-line
	* ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** **/
	desc('Check your AWS CLI Profile.');
	task('checkProfile', { async: true }, { breakOnError: true }, function() {
		if(!config.profile) fail("No awscli profile found within .env. Learn more: https://goo.gl/U2HiAs");
		complete();
	});

	
	/* ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** **
	Lambda
	* ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** **/
	desc('List Lambda functions: Ex: jake lambda:list');
	//http://docs.aws.amazon.com/cli/latest/reference/lambda/list-functions.html
	task('list', ['aws:checkProfile'], { async: true }, function() {
		if(!config.profile) console.log("Please make sure you've added AWSCLI_PROFILE to ./.env")
		var cmds = [ util.format('aws lambda list-functions --profile %s', config.profile) ];
		jake.exec(cmds, { printStdout: true });
	});


	desc('Create a Lambda function. Ex: jake lambda:create[my-test,us-east-1,arn:aws:iam::xxxxxxx:role/role-lambda-s3-to-elastic-transcoder,Lambda-Deployment.zip,My Description]');
	//http://docs.aws.amazon.com/cli/latest/reference/lambda/create-function.html
	task('create', ['aws:checkProfile'], { async: true }, function(name, region, role, zip_file, description) {
		var region   = region || "us-east-1"
		var name     = name
		var handler  = "index" + ".handler"
		var role     = role
		var zip_file = "fileb://" + zip_file;
		var description = description;
		var cmds = [
			util.format("aws lambda create-function --region %s --function-name %s --zip-file %s --role %s --handler %s --runtime nodejs6.10 --timeout 30 --description %s --debug --profile %s",
									region, name, zip_file, role, handler, description, config.profile) 
		];
		jake.exec(cmds, { printStdout: true });
	});


	desc('Get metadata about a function. Ex: jake lambda:getMetadata[arn:aws:lambda:us-west-1:xxxxxx:function:name-of-function]');
	//http://docs.aws.amazon.com/cli/latest/reference/lambda/get-function.html
	task('getMetadata', ['aws:checkProfile'], { async: true }, function(name) {
		var cmds = [ util.format("aws lambda get-function --function-name %s --profile %s", name, config.profile)];
		jake.exec(cmds, { printStdout: true });
	});



	desc('Update a function. Ex: jake lambda:update[arn:aws:lambda:us-west-1:xxxxxx:function:name-of-function, /path/to/zip/file.zip]');
	//http://docs.aws.amazon.com/cli/latest/reference/lambda/update-function-code.html
	task('update', ['aws:checkProfile'], { async: true }, function(name, zip_path) {
		var name = "helloWorld";
		var zip  = "./"
		var cmds = [ util.format('aws lambda update-function-code --function-name %s --zip-file %s --publish --profile %s', name, zip, config.profile)]
		jake.exec(cmds, { printStdout: true });
	});	
	
	
	
	desc('Invoke a function. Ex: jake lambda:invoke[arn:aws:lambda:us-west-1:xxxxxx:function:name-of-function,/path/to/file/with/args.txt]');
	//http://docs.aws.amazon.com/cli/latest/reference/lambda/invoke-async.html
	task('invoke', ['aws:checkProfile'], { async: true }, function() {
		var name = "helloWorld";
		var args = "/path/to/file/with/arguments.txt";
		var cmds = [ util.format("aws lambda invoke-async --function-name %s --invoke-args %s --debug", name, args)];		
		jake.exec(cmds, { printStdout: true });
	});
	
	
	
	desc('Delete a function. Ex: jake lambda:delete[arn:aws:lambda:us-west-1:xxxxxx:function:name-of-function,/path/to/file/with/args.txt]');
	//http://docs.aws.amazon.com/cli/latest/reference/lambda/delete-function.html
	task('delete', ['aws:checkProfile'], { async: true }, function(name) {
		var cmds = [ util.format("aws lambda delete-function --function-name %s --profile %s", name, config.profile)];
		jake.exec(cmds, { printStdout: true });
	});  
});
