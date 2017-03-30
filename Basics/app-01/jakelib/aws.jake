/* ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** **
Filename: aws.jake
Date: 3/28/17
Author: Chris Mendez http://chrisjmendez.com

Description: AWS Dashboard Console's suck because 
they lack visual and semantic consistency. This means that
it's difficult to transfer what I've learned in one dashboard 
to another because the UIX is different. For example, IAM offers 
Policy files which you assign to users, roles and groups to enable 
access.  Lambda offers Execution and Invocation Policies that are 
not found in any other dashboard. 

This command-line approach is slower at first but allows me to create
a process for creating roles, policy files for those roles and assigning
the roles to Lambda functions. 

* ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** **/
var util  = require('util');
var S3    = require('aws-sdk');

var config = {
	profile: process.env.AWSCLI_PROFILE		
}

namespace('aws', function () {
	/* ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** **
	AWS Command-line
	* ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** **/
	desc('Check your AWS CLI Profile.');
	task('checkProfile', { async: true }, { breakOnError: true }, function() {
		if(!config.profile) fail("No awscli profile found within .env. Learn more: https://goo.gl/U2HiAs");
		complete();
	});


	/* ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** **
	Users
	http://docs.aws.amazon.com/cli/latest/reference/iam/list-users.html
	* ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** **/
	desc('Create new user. Ex: jake aws:createUser[fake-username]');
	task('createUser', ['aws:checkProfile'], { async: true }, function(username) {
		if(!username) fail("Please include a username.");
		var cmds = [ util.format('aws iam create-user --user-name %s --profile %s', username, config.profile) ];
		jake.exec(cmds, { printStdout: true })
	});

	desc('Get details on a single User.');
	task('getUser', ['aws:checkProfile'], { async: true }, function(username) {
		if(!username) fail("Please include a username.");
		var cmds = [ util.format('aws iam get-user --user-name %s --profile %s', username, config.profile) ];
		jake.exec(cmds, { printStdout: true })
	});
	
	desc('List of Users.');
	task('listUsers', ['aws:checkProfile'], { async: true }, function() {
		var cmds = [ util.format('aws iam list-users --profile %s', config.profile) ];
		jake.exec(cmds, { printStdout: true });
	});


	/* ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** **
	Roles
	Description: You need 2 policy files: TRUST.json + PERMISSION.json
	* ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** **/
	desc('Create a new Role. Ex: aws:createRole[myapp-apigateway-role]');
	task('createRole', ['aws:checkProfile'], { async: true }, function(role_name, trust_policy, policy_name, permissions_policy) {
		var trust_policy = "fileb://jakelib/" + trust_policy
		var permissions_policy = "file://jakelib/" + 
		var cmds = [ 
			//Create the role and attach the trust policy that enables the apigateway service to assume this role.
			util.format('aws iam create-role --role-name %s --assume-role-policy-document %s --profile %s', role_name, trust_policy, config.profile),
			//Embed the permissions policy (as an inline policy)
			util.format('aws iam put-role-policy --role-name %s --policy-name %s --policy-document %s --profile %s', role_name, policy_name, permissions_policy, config.profile) 
		];
		jake.exec(cmds, { printStdout: true });
	});
	
	desc('List Roles.');
	task('listRoles', ['aws:checkProfile'], { async: true }, function() {
		var cmds = [ util.format('aws iam list-roles --profile %s', config.profile) ];
		jake.exec(cmds, { printStdout: true });
	});
	

	/* ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** **
	Policy Files
	* ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** **/
	desc('Create a Policy File.');
	task('createPolicy', ['aws:checkProfile'], { async: true }, function(policy_name, policy_json) {
		if(!policy_name || !policy_json || !description) fail("Please include a policy name, a json file and a description.");
		var cmds = [ util.format('aws iam create-policy --policy-name %s --policy-document %s --description %s --profile %s', policy_name, policy_json, config.profile) ];
		jake.exec(cmds, { printStdout: true });
	});	

	/* ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** **
	Groups
	* ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** **/
	desc('Create a Group.');
	task('createGroup', ['aws:checkProfile'], { async: true }, function(user) {
	});	
	
	desc('Add User to a Group');
	task('addToGroup', ['aws:checkProfile'], { async: true }, function(user) {
	});	
	
	/* ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** **
	Lambda
	* ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** **/
	desc('List Lambda functions');
	task('listFunctions', ['aws:checkProfile'], { async: true }, function(user) {
		var cmds = [ util.format('aws lambda list-functions --profile %s', config.profile) ];
		jake.exec(cmds, { printStdout: true });
	});	
	
	desc('Upload Lambda Function');
	task('createLambda', ['aws:checkProfile'], { async: true }, function(name, role, zip_file, description) {
		var region   = "us-east-1"
		var name     = name
		var handler  = name + ".handler"
		var role     = role
		var zip_file = "fileb://" + zip_file;
		var description = description;
		var cmds = [ util.format("aws lambda create-function --region %s --function-name %s --zip-file %s --role %s --handler %s --runtime nodejs4.3 --timeout 3 --description %s --debug --profile %s",
									region, name, zip_file, role, handler, description, config.profile) 
		];
		jake.exec(cmds, { printStdout: true });
	});

	desc('Add User to a Group');
	task('addToGroup', ['aws:checkProfile'], { async: true }, function(name, zip_path) {
		var name = "helloWorld";
		var zip  = "./"
		var cmds = [ util.format('aws lambda update-function-code --function-name %s --zip-file %s --publish --profile %s', name, zip, config.profile)]
		jake.exec(cmds, { printStdout: true });
	});	
	
	desc('Invoke a Lambda function');
	task('addToGroup', ['aws:checkProfile'], { async: true }, function(user) {
		var name = "helloWorld";
		var args = "/path/to/file/with/arguments.txt";
		var cmds = [ util.format("aws lambda invoke-async --function-name %s --invoke-args %s --debug", name, args)];		
		jake.exec(cmds, { printStdout: true });
	});
	
	desc('Get metadata about a function');
	task('getMetadata', ['aws:checkProfile'], { async: true }, function(name) {
		var cmds = [ util.format("aws lambda get-function --function-name %s --profile %s", name, config.profile)];
		jake.exec(cmds, { printStdout: true });
	});

	desc('Get metadata about a function');
	task('deleteFunction', ['aws:checkProfile'], { async: true }, function(name) {
		var cmds = [ util.format("aws lambda delete-function --function-name %s --profile %s", name, config.profile)];
		jake.exec(cmds, { printStdout: true });
	});  

	desc('Create AWS Basic Execution Policy');
	task('createExecutionPolicy', ['aws:checkProfile'], { async: true }, function(policy_name) {
		var json = {
			"Version": "2012-10-17",
			"Statement": [{
					"Effect": "Allow",
					"Action": [
						"logs:CreateLogGroup",
						"logs:CreateLogStream",
						"logs:PutLogEvents"						
					],
					"Resource": "arn:aws:logs:*:*:*"
			}]
		}
		var cmds = [ util.format('aws iam create-policy --policy-name %s --policy-document %s --description %s --profile %s', 
					policy_name, policy_json, desciption, config.profile) ];
		jake.exec(cmds, { printStdout: true });		
	});	
});


function getPolicy(service){
	var json = ""
	switch(service){
	case "lambda":
		json = {
			"Version": "2012-10-17",
			"Statement": [
				{
					"Effect": "Allow",
					"Action": [
						"apigateway:*"
					],
					"Resource": [
						"arn:aws:logs:*:*:*"
					]
				},
				{
					"Effect": "Allow",
					"Action": [
						"apigateway:*"
					],
					"Resource": [
						"arn:aws:apigateway:us-east-1::/restapis/*/stages/dev"
					]
				}
			]
		}
		break;
	default: 
		break
	}
	return json
}