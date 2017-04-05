/* ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** **
Filename: kms.jake
Title: Key Management Services
Date: 4/2/17
Author: Chris Mendez http://chrisjmendez.com
Description: Encrypt your API keys and enable AWS to manage them for you. 
Docs: http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/KMS.html
Dashboard: https://console.aws.amazon.com/iam/home#/encryptionKeys/
* ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** **/
var AWS = require("aws-sdk");

namespace('kms', function (){
  desc('Encrypts plaintext into ciphertext by using a customer master key.');
  task('encrypt', ['config:checkCredentials'], { async: true }, { breakOnError: true, printStdout: true }, function(alias_or_arn, data) {
    var kms = new AWS.KMS({apiVersion: '2014-11-01'});
    var params = {
      //The "ARN" or the "Alias" of the CMK that was used to encrypt the data.
      //https://console.aws.amazon.com/iam/home#/encryptionKeys/
      KeyId: alias_or_arn,
      //Data you want to encrypt
      Plaintext: data
    };
    
    kms.encrypt(params, function(err, data) {
      if (err) throw Error(err.stack, "kms.jake", "27");       
        var t = jake.Task['kms:decrypt'];
				    t.invoke.apply(t, [data.CiphertextBlob]);
    });
  });
  
  desc('Decrypts ciphertext into plaintext by using a customer master key.');
  task('decrypt', ['config:checkCredentials'], { async: true }, { breakOnError: true, printStdout: true }, function(input, output) {
    var kms = new AWS.KMS({apiVersion: '2014-11-01'});
    var params = {
      //Buffer, blob
     CiphertextBlob: input
    };
    kms.decrypt(params, function(err, data) {
      if (err) console.log(err, err.stack); // an error occurred
      var text = data.Plaintext.toString('utf8')
      console.log("Text:", text );
    });
  });
});