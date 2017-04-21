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

namespace('twitter', function () {
  desc('');
  task('', { async: true }, function() {
    //This is the value returned from the prerequisite
    var cmds = [ util.format() ];
    jake.exec(cmds, { printStdout: true });
  });
});
