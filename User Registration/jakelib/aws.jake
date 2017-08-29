/* ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** **
Filename: aws.jake
Date: 3/31/17
Author: Chris Mendez http://chrisjmendez.com

Description:
I created an AWS CLI profile on my local machine titled "alt". 
Learn more: http://www.chrisjmendez.com/2017/01/01/aws-working-with-aws-client/
            http://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/loading-node-credentials-shared.html
* ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** **/
var AWS  = require("aws-sdk");

require('dotenv').config();

namespace('aws', function () {
	//Create a .env file
	var AWS_CREDENTIALS = {
		profile: process.env.AWS_PROFILE,
		client_id: process.env.CLIENT_ID,
		pool_id: process.env.POOL_ID,
		region: process.env.AWS_REGION
	}

	desc('Prerequisite to most jake tasks.  This loads credentials in NodeJS.');
	task('loadCredentials', { async: true }, { breakOnError: true }, function() {
		if(AWS_CREDENTIALS.profile){
			AWS.config.credentials = new AWS.SharedIniFileCredentials({ profile: AWS_CREDENTIALS.profile });
		} 
		else if(AWS_CREDENTIALS.accessKeyId && AWS_CREDENTIALS.secretAccessKey && AWS_CREDENTIALS.region ){
			AWS.config = new AWS.Config({
				region:          AWS_CREDENTIALS.region,
				accessKeyId:     AWS_CREDENTIALS.accessKeyId, 
				secretAccessKey: AWS_CREDENTIALS.secretAccessKey
			});
		} 
		else {
			fail("No awscli profile found within .env. Learn more: https://goo.gl/U2HiAs");
		}
		//console.log(AWS.config.credentials);
		complete(AWS_CREDENTIALS);
	});
});

