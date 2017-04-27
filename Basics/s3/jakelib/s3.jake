/* ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** **
Filename: s3.jake
Date: 3/31/17
Author: Chris Mendez http://chrisjmendez.com
Dashboard Console: 
Docs: 
Description:
	
* ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** **/
var util = require('util');

namespace('s3', function () {	
	
	var config = { profile: "aws_credentials_profile" }

	desc('Create an S3 bucket.');
	task('create', ['aws:loadCredentials'], { async: true }, function(bucket_name) {
		var cmds = [ util.format('aws s3 mb %s --profile %s', bucket_name, config.profile) ];
		jake.exec(cmds, { printStdout: true });
	});

	
	desc('Upload a file to an S3 bucket.');
	task('upload', ['aws:loadCredentials'], { async: true }, function(bucket_name, file) {    
		var cmds = [ util.format('aws s3 cp %s s3://%s --profile %s', file, bucket_name, config.profile) ];
		jake.exec(cmds, { printStdout: true });
	});
	

	desc('List objects within a bucket.');
	task('list', ['aws:loadCredentials'], { async: true }, function(bucket_name) {
		var cmds = [ util.format('aws s3 ls s3://%s --profile %s', bucket_name, config.profile) ];
		jake.exec(cmds, { printStdout: true });
	});
});