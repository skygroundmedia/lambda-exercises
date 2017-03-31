/* ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** **
Filename: aws.jake
Date: 3/31/17
Author: Chris Mendez http://chrisjmendez.com

Description:

* ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** **/
var util = require('util');
var AWS  = require("aws-sdk");
var fs   = require('fs');

namespace('aws', function () {

	//A. Declare which AWS CLI profile to use.
	var AWS_CREDENTIALS = {
		profile: "sgm"
	}

	desc('Load credentials in NodeJS');
	//http://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/loading-node-credentials-shared.html
	task('loadCredentials', { async: true }, { breakOnError: true }, function() {
		if(!AWS_CREDENTIALS.profile) fail("No awscli profile found within .env. Learn more: https://goo.gl/U2HiAs");
		AWS.config.credentials = new AWS.SharedIniFileCredentials({ profile: AWS_CREDENTIALS.profile });
		//console.log(AWS.config.credentials);
		complete();
	});
});
