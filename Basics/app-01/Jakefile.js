require('dotenv').config({path: ''});
var util = require('util');

desc('Archive app and upload to S3.');
task('default', { async: true }, function() {
	var config = {
		//Name of this .zip file
		app: process.env.APP,
		//Name of your AWS S3 Bucket destination
		bucket:      process.env.BUCKET,
		//Name of your AWS Client profile
		profile: process.env.AWSCLI_PROFILE		
	}

	console.log('Jake Start.');
	function archive(){
		var task = jake.Task['app:archive'];
		task.addListener("start", function(){
			console.log("Archive Start.");
		})
		task.addListener("complete", function(){
			console.log("Archive Complete.");
			upload()
		})
		task.addListener("error", function(e){
			console.log("Archive Error: ", e.message, e.code);
		})
		task.invoke.apply(task, [config]);
	}

	function upload(){
		var task = jake.Task['app:upload'];
		task.addListener("start", function(){
			console.log("Upload Start.")
		});
		task.addListener("complete", function(){
			console.log("Upload Complete.")
			complete();
		})
		task.addListener("error", function(e){
			console.log("Upload Error: ", e.message, e.code);
		})
		task.invoke.apply(task, [config])
	}  
	archive();
});


namespace('app', function () {
	desc('Archive app for upload.');
	task('archive', { async: true }, function(config) {
		//Exclude hidden files, single isolated files, and specific node_modules then concatenate them
		var excludes = ['-x .\* -x "package.json"', '-x "Jakefile.js"', '-x \*.md', '-x "node_modules/dotenv\*"'].join(" ")
		//Recursively Zip everything with exception to anything within excludes
		var cmds = [ util.format('zip -r %s * %s', config.app, excludes) ];
		//Set "printStdout" to "true" if you want to see the stack trace
		jake.exec(cmds, { printStdout: false }, function(){
			complete();
		})
	});

	desc('Upload a local .zip file to an AWS S3 bucket.');
	task('upload', { async: true }, function(config) {
		var cmds = [ util.format('aws s3 cp %s.zip s3://%s --profile %s', config.app, config.bucket, config.profile) ];
		//Set "printStdout" to "true" if you want to see the stack trace
		jake.exec(cmds, { printStdout: false }, function () {
			complete();
		});
	});
});
