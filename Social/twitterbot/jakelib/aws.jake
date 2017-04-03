/* ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** **
Filename: config.jake
Date: 4/2/17
Author: Chris Mendez http://chrisjmendez.com

Description:
  I created an AWS CLI profile on my local machine titled "sgm". 
  Learn more: http://www.chrisjmendez.com/2017/01/01/aws-working-with-aws-client/
* ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** **/
var AWS  = require("aws-sdk");

var AWS_CREDENTIALS = {
	profile: "gp"
}

namespace('config', function () {
	desc('Prerequisite to most jake tasks.  This loads credentials in NodeJS.');
	//http://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/loading-node-credentials-shared.html
	task('checkCredentials', { async: true }, { breakOnError: true }, function() {
		if(!AWS_CREDENTIALS.profile) fail("No awscli profile found within .env. Learn more: https://goo.gl/U2HiAs");
		AWS.config.credentials = new AWS.SharedIniFileCredentials({ profile: AWS_CREDENTIALS.profile });
		//console.log(AWS.config.credentials);
		complete();
	});
});
