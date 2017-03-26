/* ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** **
Filename: api.jake
Date: 3/26/17
Author: Chris Mendez http://chrisjmendez.com
Description: API requests made to an AWS API Gateway.
It is assumed that within your AWS API Gateway, you 
might have a single function written for three stages: 
dev, staging, and prod.

Example: 

//Submit a CURL request to the Productin API
jake api:getAll[prod]

* ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** **/
var util = require('util');
var apiConfig = {
	development: process.env.API_DEV,
	staging:     process.env.API_STAGING,
	production:  process.env.API_PROD
}

namespace('api', function () {
	desc('Get All Orders. Ex: jake api:getAll[prod]');
	task('getAll', { async: true }, function(env) {
		var url  = getURLPath(env);
		var cmds = [ util.format('curl %s', url) ];
		console.log(cmds)
		jake.exec(cmds, { printStdout: false }, function(){
			complete();
		})
	});	
});

//Return the URL based on the staging environment
function getURLPath(env){
	var url = ""
	switch(env){
	case "stag":
	case "staging":
		url = apiConfig.staging
		break;
	case "prod":
	case "production":
		url = apiConfig.production
		break;
	case "dev":
	case "development":
	default:
		url = apiConfig.development
	}
	console.log("Environment:", env, " URL:", url );
	return url
}

