/* ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** **
Filename: iam.jake
Date: 3/31/17
Author: Chris Mendez http://chrisjmendez.com
Dashboard Console: 
Docs: 
Description:
	
* ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** **/
var util = require('util');
var AWS  = require("aws-sdk");

namespace('iam', function () {
  desc('IAM: List Users');
  task('listUsers', ['config:checkCredentials'], { async: true }, function() {
    //This is the value returned from the prerequisite
    var cmds = [ util.format('aws iam list-users --profile %s', AWS.config.credentials.profile) ];
    jake.exec(cmds, { printStdout: true });
  });
});
