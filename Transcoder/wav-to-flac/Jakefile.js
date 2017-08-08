/* ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** **
Filename: Jakefile
Date: 8/07/17
Author: Chris Mendez http://chrisjmendez.com
Description: This is the generic jake file. Run
  "jake -T" to see all the availabel commands within
  this specific app.
* ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** **/

//A. You need this to detect your default settings
require('dotenv').config({path: ''});

desc('Jakefile default.');
task('default', { async: true }, function() {
	var config = {
		profile: process.env.AWSCLI_PROFILE		
	}
});