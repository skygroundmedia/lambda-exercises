/* ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** **
Filename: aws.jake
Date: 4/2/17
Author: Chris Mendez http://chrisjmendez.com

Description:
  I created an AWS CLI profile on my local machine titled "sgm". 
  Learn more: http://www.chrisjmendez.com/2017/01/01/aws-working-with-aws-client/
* ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** **/
var AWS  = require("aws-sdk");

//A. YOU MUST MODIFY THIS
var AWS_CREDENTIALS = { 
  // ~/.aws/credentials
  profile: "gp",
  // ~/.aws/config
  region:'us-east-1'
}

namespace('config', function () {
	desc('CONFIG: Prerequisite to most jake tasks.  This loads credentials in NodeJS.');
	task('checkCredentials', { async: true }, { breakOnError: true }, function() {
		if(!AWS_CREDENTIALS.profile) fail("No awscli profile found within .env. Learn more: https://goo.gl/U2HiAs");
    //B. Assign an AWS Credential profile to your AWS SDK
    var credentials = new AWS.SharedIniFileCredentials({ profile: AWS_CREDENTIALS.profile });
    AWS.config.credentials = credentials;
    //C. Assign an AWS Config profile to your AWS SDK
    AWS.config.update({ region: AWS_CREDENTIALS.region });
    //D. Return back the AWS profile
		complete();
	});
});
