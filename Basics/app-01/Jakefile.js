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
  var config = {
    //Name of this .zip file
    app: process.env.APP,
    //Name of your AWS S3 Bucket destination
    bucket: process.env.BUCKET,
    //Name of your AWS Client profile
    profile: process.env.AWSCLI_PROFILE		
  }
  //Start
  init(config);
});

/*
  Workflow
*/
function archive(config){
  var task = jake.Task['app:archive'];
    task.addListener("start", onStart.bind(null,"archive"))
    //Once we're done archiving the app, let's upload it to AWS S3
    task.addListener("complete", onComplete.bind(null, upload, config ), false)
    task.addListener("error", onError);
    task.invoke.apply(task, [config]);
}

function upload(config){
  var task = jake.Task['app:upload'];
    task.addListener("start", onStart.bind(null, "upload"))
    //Once we're done uploading the files, reset the environment
    task.addListener("complete", onComplete.bind(null, reset, config ), false);
    task.addListener("error", onError);
    task.invoke.apply(task, [config])
}

function reset(config){
  var task = jake.Task['app:reset'];
    task.addListener("start", onStart.bind(null, "reset"))
    //Once the process is complete, we're done.
    task.addListener("complete", onComplete.bind(null, complete, null ), false)  
    task.addListener("error", onError);
    task.invoke.apply(task, [config])
}

function init(config){
  console.log('Jake Start.');
  if(config.app && config.bucket && config.profile){
    archive(config);
  } else {
    var example = `
    APP=name_of_zip_file
    BUCKET=name_of_s3_bucket
    AWSCLI_PROFILE=name_of_awscli_profile`
    console.log("Please make sure you have a .env file that includes these variables: ", example)
  }
}

/*
  Event Handlers
*/
function onStart(callee){
  console.log(arguments.callee.name, ": ", callee);
}

function onComplete(callback, config){
  console.log(arguments.callee.name, config);
  callback(config)
}

function onError(e){
  console.log("Reset Error: ", e.message, e.code);
  //If things go wrong, re-download the npm packages we deleted.
  jake.Task['app:reset'].invoke();
}

