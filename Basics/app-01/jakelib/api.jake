/* ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** **
Filename: api.jake
Date: 3/26/17
Author: Chris Mendez http://chrisjmendez.com
Description: API requests made to an AWS API Gateway.
It is assumed that within your AWS API Gateway, you 
might have a single function written for three stages: 
dev, staging, and prod.
* ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** **/
var util = require('util');

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
			url = "http://staging.domain.ext/path/"
			break;
			//Production 
		case "prod":
			url = "http://prod.domain.ext/path/"
			break;
			//By default, it's always development
		default:
			url = "http://dev.domain.ext/path/"
		}
		return url
	}
});