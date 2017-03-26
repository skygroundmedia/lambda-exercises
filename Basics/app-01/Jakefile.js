/* ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** **
Filename: Jakefile
Date: 3/26/17
Author: Chris Mendez http://chrisjmendez.com
Description: DevOps tool aimed at simplifying two things:
- The packaging and publishing of AWS Lambda functions
- Streamline HTTP Requests to AWS API Gateway to test Lambda functions.

The task below titled "default" simply 
* ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** **/

require('dotenv').config({path: ''});

desc('Archive app and upload to S3.');
task('default', { async: true }, function() {
	console.log('Jake Start.');
	var config = {
		//Name of this .zip file
		app: process.env.APP,
		//Name of your AWS S3 Bucket destination
		bucket: process.env.BUCKET,
		//Name of your AWS Client profile
		profile: process.env.AWSCLI_PROFILE		
	}
	console.log("Config: ", config)
	function archive(config){
		var task = jake.Task['app:archive'];
		task.addListener("start", function(){
			console.log("Archive Start.");
		})
		task.addListener("complete", function(){
			console.log("Archive Complete.");
			upload(config);
		})
		task.addListener("error", function(e){
			console.log("Archive Error: ", e.message, e.code);
		})
		task.invoke.apply(task, [config]);
	}

	function upload(config){
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
	
	if(config.app && config.bucket && config.profile){
		archive(config);
	} 
	else {
		var example = `
		APP=name_of_zip_file
		BUCKET=name_of_s3_bucket
		AWSCLI_PROFILE=name_of_awscli_profile`
		console.log("Please make sure you have a .env file that includes these variables: ", example)
	}
});

