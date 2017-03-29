/* ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** **
Filename: aws.jake
Date: 3/28/17
Author: Chris Mendez http://chrisjmendez.com

Description: The various AWS Dashboard Consoles suck because 
they lack visual and semantic consistency which means that 
users struggle to transfer what they've learned between 
applications. For example, IAM offers Policy files which you 
assign to users, roles and groups to enable access.  Lambda offers
Execution and Invocation Policies that are not found in any other dashboard. 

For this reason, I've just started using command line console because
it's way more consistent then the UIX of the dashboard consoles.

* ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** **/
var util  = require('util');
var S3    = require('aws-sdk');

var config = {
	profile: process.env.AWSCLI_PROFILE		
}

namespace('aws', function () {

	/*
		AWS Command-line
	*/	
	desc('Check your AWS CLI Profile.');
	task('checkProfile', { async: true }, { breakOnError: true }, function() {
		if(!config.profile) fail("No awscli profile found within .env. Learn more: https://goo.gl/U2HiAs");
		complete();
	});


	/*
		Users
	*/
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
	
	desc('Get a list of Users.');
	task('getUsers', ['aws:checkProfile'], { async: true }, function() {
		var cmds = [ util.format('aws iam list-users --profile %s', config.profile) ];
		jake.exec(cmds, { printStdout: true });
	});


	/*
		Roles
	*/	
	desc('Create a new Role');
	task('createRole', ['aws:checkProfile'], { async: true }, function() {
	});


	/*
		Policy Files
	*/	
	desc('Create a Policy File.');
	task('createPolicy', ['aws:checkProfile'], { async: true }, function(policy_name, policy_json, description) {
		if(!policy_name || !policy_json || !description) fail("Please include a policy name, a json file and a description.");
		var cmds = [ util.format('aws iam create-policy --policy-name %s --policy-document %s --description %s --profile %s', policy_name, policy_json, desciption, config.profile) ];
		jake.exec(cmds, { printStdout: true });
	});	


	/*
		Groups
	*/
	desc('Create a Group.');
	task('createGroup', ['aws:checkProfile'], { async: true }, function(user) {
	});	
	
	desc('Add User to a Group');
	task('addToGroup', ['aws:checkProfile'], { async: true }, function(user) {
	});	
});
