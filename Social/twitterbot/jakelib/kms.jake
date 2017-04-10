/* ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** **
Filename: kms.jake
Title: Key Management Services
Date: 4/2/17
Author: Chris Mendez http://chrisjmendez.com
Description: Encrypt your API keys and enable AWS to manage them for you. 
Docs:      http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/KMS.html
Dashboard: https://console.aws.amazon.com/iam/home#/encryptionKeys/
Encoding:  http://stackoverflow.com/a/6182519
* ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** **/
var AWS = require("aws-sdk");

namespace('kms', function (){
  desc('Encrypts plaintext into ciphertext by using a customer master key. Ex: jake kms:[alias,data,encoding_type]');
  task('encrypt', ['config:checkCredentials'], { async: true }, { breakOnError: true, printStdout: true }, function(alias_or_arn, data, type) {
    var kms = new AWS.KMS({apiVersion: '2014-11-01'});
    var params = {
      //The "ARN" or the "Alias" of the CMK that was used to encrypt the data.
      //https://console.aws.amazon.com/iam/home#/encryptionKeys/
      KeyId: alias_or_arn,
      //Buffer, Typed Array, Blob, String
      Plaintext: data
    };
    
    kms.encrypt(params, function(err, data) {
      if (err) throw Error(err.stack, "kms.jake", "27");
      //Convert this from a Buffer to a Base64 string
      var buffer = data.CiphertextBlob;
      var encoding = ""
      switch(type){
      case "utf8":
        encoding = Buffer.from(buffer).toString('utf8');
        break;
      case "ascii":
        encoding = Buffer.from(buffer).toString('ascii')
        break;
      case "binary":
        encoding = Buffer.from(buffer).toString('binary')
        break;
      default:
        type = "base64"
        encoding = Buffer.from(buffer).toString('base64')
      }
      console.log("kmd:encrypt: encoding: ", encoding);
      //      var t = jake.Task['kms:decrypt'];
      //      t.invoke.apply(t, [encoding, type]);
    });
  });
  
  
  desc('Decrypts ciphertext into plaintext by using a customer master key. Ex: jake kms:decrypt[input,encoding_type,output]');
  task('decrypt', ['config:checkCredentials'], { async: true }, { breakOnError: true, printStdout: true }, function(input, type, output) {
    var kms = new AWS.KMS({apiVersion: '2014-11-01'});
    if(type == undefined) type = "base64";
    var decoded = Buffer.from(input, type)
    var params = {
      CiphertextBlob: decoded
    };
    kms.decrypt(params, function(err, data) {
      if (err) console.log("###", err, err.stack);
      var val = data.Plaintext.toString('utf8');
      console.log("kms::decrypt:", val );
      complete(val);
    });
  });
});
