/* ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** **
Filename: s3.jake
Date: 3/31/17
Author: Chris Mendez http://chrisjmendez.com
Dashboard Console: 
Docs: 
Description:
	
* ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** **/
var util = require('util');

namespace('lambda', function () {
	
	desc('');
	task('', ['config:loadCredentials'], { async: true }, function(bucket_name, file) {
		var cmds = [ util.format('aws s3 cp s3://%s --profile %s', bucket_name, config.profile) ];
		jake.exec(cmds, { printStdout: true });
	});
	

	desc('');
	task('', ['config:loadCredentials'], { async: true }, function(bucket_name) {
		var cmds = [ util.format('aws s3 ls s3://%s --profile %s', bucket_name, config.profile) ];
		jake.exec(cmds, { printStdout: true });
	});
});