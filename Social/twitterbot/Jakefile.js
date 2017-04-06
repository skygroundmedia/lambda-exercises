/* ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** **
Filename: Jakefile
Date: 4/2/17
Author: Chris Mendez http://chrisjmendez.com
Description: This is the generic jake file. Run
"jake -T" to see all the availabel commands within
this specific app.
* ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** **/

require('dotenv').config({path: ''});

var AWS = require("aws-sdk");

desc('Jakefile default.');
task('default', ["decryptCredentials"], { async: true }, function() {
      
});

task('decryptCredentials', ['config:checkCredentials'], { async: true }, function() {
  var config = {
    "consumer_key":      process.env.consumer_key,
    "consumer_secret":   process.env.consumer_secret,
    "access_key_token":  process.env.access_key_token,
    "access_key_secret": process.env.access_key_secret
  }
  
  var type = "base64";
  
  for( item in config){
    var idx = Object.keys(config).indexOf(item);
    
    var t = jake.Task['kms:decrypt'];
        t.invoke.apply(t, [config[item], type]);
  }
});
