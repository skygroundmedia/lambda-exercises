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
	
	desc('IAM: Create new user. Ex: jake aws:createUser[fake-username]');
	task('checkProfile', { async: true }, { breakOnError: true }, function() {
		if(!config.profile) fail("No awscli profile found within .env. Learn more: https://goo.gl/U2HiAs");
		complete();
	});	

	desc('IAM: Create new user. Ex: jake aws:createUser[fake-username]');
	task('createUser', ['aws:checkProfile'], { async: true }, function(username) {
		if(!username) fail("Please include a username.");
		var cmds = [ util.format('aws iam create-user --user-name %s --profile %s', username, config.profile) ];
		jake.exec(cmds, { printStdout: true }, function(){
			complete();
		})
	});

	desc('Create a new Role');
	task('createRole', { async: true }, function() {
		
	});

	desc('Get user info');
	task('getUser', { async: true }, function(username) {
		var cmds = [ util.format('aws iam get-user --user-name %s --profile %s', username, config.profile) ];
		jake.exec(cmds, { printStdout: true })
	});
	
	desc('Create a Policy File.');
	task('createPolicy', { async: true }, function(policy_name, policy_document, description) {
		var cmds = [ util.format('aws iam create-policy --policy-name %s --policy-document %s --description %s --profile %s', policy_name, policy_document, desciption, config.profile) ];
		jake.exec(cmds, { printStdout: true }, function(){
			complete();
		})		
	});	

	desc('Create Group');
	task('getGroup', { async: true }, function() {    
	});
	
	desc('Add User to a Group');
	task('addToGroup', { async: true }, function(user) {
	});	
});
