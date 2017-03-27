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
var util    = require('util')
var request = require('request')
var apiConfig = {
	development: process.env.API_DEV,
	staging:     process.env.API_STAGING,
	production:  process.env.API_PROD
}

namespace('api', function () {
	desc('GET All Orders. Ex: jake api:getAll[prod]');
	task('getAll', { async: true }, function(env) {
		//A. Get the URL path based on your dev environment: dev, stating, prod
		var url  = getURLPath(env);
		var path = "guitars/"
		//B. We are using curl to show how to do this manually
		var cmds = [ util.format('curl %s%s', url, path) ];
		console.log(cmds)
		jake.exec(cmds, { printStdout: true, printStderr: true }, function(){
			complete();
		})
	});
	
	desc('GET item detail based on orderId.');
	task('getItemDetail', { async: true }, function(env) {
		//A. Create URL
		var url  = getURLPath(env);
		var orderId = "123456";
		var path = url + "guitars/" + orderId;
		//B. Use NPM Request to construct a GET request
		request.get({ url: path, json: true }, function(err, res){
			if(err) throw err
			console.log(res.body)
		});
	});
	
	desc('POST order');
	task('getOrder', { async: true }, function(env) {		
		//A. Create URL
		var orderId = "abcd123";
		//B. Use NPM Request to construct a POST request
		request.post({
			//headers: {'content-type' : 'application/x-www-form-urlencoded'},
			url:     getURLPath(env) + 'order/',
			body:    JSON.stringify({ orderId: orderId})
		}, function(err, res, data){
			if(err) throw err;
			if( data ){
				console.log(JSON.parse(data))
			}
		});
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
