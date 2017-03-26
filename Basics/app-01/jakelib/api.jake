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
	desc('GET All Orders. Ex: jake api:getAll[prod]');
	task('getAll', { async: true }, function(env) {
		var url  = getURLPath(env);
		var path = "guitars/"
		var cmds = [ util.format('curl %s%s', url, path) ];
		console.log(cmds)
		jake.exec(cmds, { printStdout: true, printStderr: true }, function(){
			complete();
		})
	});
	
	desc('GET item detail based on orderId.');
	task('getItemDetail', { async: true }, function(env) {
		var url  = getURLPath(env);
		var orderId = "123456";
		var path = "guitars/" + orderId;
		var cmds = [ util.format('curl %s%s', url, path) ];
		console.log(cmds)
		jake.exec(cmds, { printStdout: true, printStderr: true }, function(){
			complete();
		})
	});
	
	desc('POST order');
	//curl POST Request https://superuser.com/a/149335
	task('getOrder', { async: true }, function(env) {
		var url  = getURLPath(env);
		var path = "order/"
		var cmds = [ util.format('curl --request POST %s%s', url, path) ];
		console.log(cmds)
		jake.exec(cmds, { printStdout: true, printStderr: true }, function(){
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

