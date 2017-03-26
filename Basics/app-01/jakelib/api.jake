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
	development: "http://dev.domain.ext/path/",
	staging:     "http://staging.domain.ext/path/",
	production:  "http://prod.domain.ext/path/"
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
	
	//Return the URL based on the specific staging environment
	function getURLPath(env){
		var url = ""
		switch(env){
			//Staging
		case "staging":
			url = apiConfig.staging
			break;
			//Production 
		case "prod":
			url = apiConfig.production
			break;
			//By default, it's always development
		default:
			url = apiConfig.development
		}
		return url
	}
});
