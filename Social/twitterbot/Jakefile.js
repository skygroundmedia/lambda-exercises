/* ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** **
Filename: Jakefile
Date: 4/2/17
Author: Chris Mendez http://chrisjmendez.com
Description: This is the generic jake file. Run
"jake -T" to see all the availabel commands within
this specific app.
* ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** **/

var async = require("async");
var AWS = require("aws-sdk");
var Twitter = require('twitter');
var credentials = require('./credentials');

desc('Jakefile default.');
task('default', ["decryptCredentials"], { async: true }, function() {
        
});

task('decryptCredentials', ['config:checkCredentials'], { async: true }, function() {
  async.waterfall([
    function(callback) {
      var key = credentials["consumer_key"];
      decrypt(key, function(err, val){
        if(err) callback(err)
        callback(null, val)
      })
    },
    function(arg1, callback) {
      var key = credentials["consumer_secret"];
      decrypt(key, function(err, val){
        if(err) callback(err)
        callback(null, arg1, val)
      })
    },
    function(arg1, arg2, callback) {
      var key = credentials["access_token_key"];
      decrypt(key, function(err, val){
        if(err) callback(err)
        callback(null, arg1, arg2, val)
      })
    },
    function(arg1, arg2, arg3, callback) {
      var key = credentials["access_token_secret"];
      decrypt(key, function(err, val){
        if(err) callback(err)
        callback(null, arg1, arg2, arg3, val)
      })
    }
    ], function(err, results) {
    if(err) throw err;
    console.log("async.parallel:", results);
    
    var t = jake.Task['sendTweet'];
//        t.invoke.apply(t, [results]);
  });
});

task('sendTweet', ['config:checkCredentials'], { async: true }, function(decrypted_credentials) {
  var tweet_examples = [
    "Rock on Friends!",
    "This is my second tweet.",
    "This is my third tweet.",
    "This is my fourth tweet.",
    "This is my fifth tweet.",
    "This is my sixth tweet."
  ];
  
  async.auto({
    send_tweet: [function(results, callback) {
      status = tweet_examples[0];
      console.log(decrypted_credentials)
      var client = new Twitter(decrypted_credentials);
          client.post('statuses/update', { status: status }, function(err, tweet, res){
            console.log("send_tweet", tweet);
            if(err) console.log("!!!!", err);
          });
    }],
    cleanup: ['send_tweet', function(results, callback) {
      console.log('cleanup:', JSON.stringify(results));
      callback(null, {});
    }]
  }, function(err, results) {
    console.log('err = ', err);
    console.log('results = ', results);
  });
});

function decrypt(key, callback){
  var kms = new AWS.KMS({apiVersion: '2014-11-01'});
  var decoded = Buffer.from(key, "base64");
  var params = { CiphertextBlob: decoded };
  kms.decrypt(params, function(err, data) {
    if (err) callback(err)
    console.log(data.Plaintext)
    var val = data.Plaintext.toString('utf8');
    callback(null, val)
  });
}