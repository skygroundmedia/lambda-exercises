/* ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** **
Filename: app.jake
Date: 08/06/17
Author: Chris Mendez http://chrisjmendez.com

Description: DevOps tool aimed at streamlining the process
of archiving and uploading Lambda methods to AWS S3. 
The purpose for publishing to an S3 bucket –instead of 
copying and pasting to the Lambda in-line console– 
is so that we can also page 3rd party libraries.

* ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** **/
var util = require('util');

//A. Name your packge that you will upload.
var config = {
	app: 'myApp'
}

namespace('app', function () {
	
	
	desc('Update your .env configuration. Ex: jake app:config[name_of_aws_profile]');
	task('config', { async: true }, function(profile_name) {
		var cmds = [ util.format('aws configure --profile %s', profile_name) ];
		jake.exec(cmds, { printStdout: false });
	});
	
	
	desc('Archive app for upload.');
	task('archive', { async: true }, function() {
		//A. Itemize the files you're excluding then concatenate them
		var excludes = [
			//Hidden files (i.e. .gitignore, .env)
			'-x .\*',
			//NPM package file
			'-x "package.json"', 
			//NPM Jakefile
			'-x "Jakefile.js"', 
			//ReadMe notes
			'-x \*.md',
			//HTTP Request Simulator
			'-x \*.paw',
			//AWS Policy Files
			'-x "aws_policies\*"',
			//Jakefile tasks
			'-x "jakelib\*"'
		].join(" ")
		//B. Spell out the commands you intend to run
		var cmds = [
			//Remove all node modules including -devDependencies
			"rm -r node_modules",
			//Only install the production-ready modules
			"npm install --only=production",
			//Recursively Zip everything with exception to anything within excludes
			util.format('zip -r %s * %s', config.app, excludes)
		];
		//Set "printStdout" to "true" if you want to see the stack trace
		//C. Run the commands
		jake.exec(cmds, { printStdout: false }, function(){
			complete();
		})
	});


	desc('Upload (aka copy) local .zip to an AWS S3 bucket.');
	task('upload', { async: true }, function(config) {
		var cmds = [ util.format('aws s3 cp %s.zip s3://%s --profile %s', config.app, config.bucket, config.profile) ];
		//Set "printStdout" to "true" if you want to see the stack trace
		jake.exec(cmds, { printStdout: false }, function () {
			complete();
		});
	});
  

	desc('Reset the environment for development mode.');
	task('reset', { async: true }, function(config) {
		var cmds = [ 
			"rm -r node_modules",
			"npm install --only=dev" 
		];
		//Set "printStdout" to "true" if you want to see the stack trace
		jake.exec(cmds, { printStdout: false }, function () {
			complete();
		});
	});
});
