/* ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** **
Filename: aws.jake
Date: 4/2/17
Author: Chris Mendez http://chrisjmendez.com

Description:
I created an AWS CLI profile on my local machine titled "sgm". 
Learn more: http://www.chrisjmendez.com/2017/01/01/aws-working-with-aws-client/
* ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** **/
var AWS = require("aws-sdk");
var kms = new AWS.KMS();

namespace('kms', function () {
  desc('Encrypts plaintext into ciphertext by using a customer master key.');
  task('encrypt', ['config:checkCredentials'], { async: true }, { breakOnError: true, printStdout: true }, function() {

    var params = {
      KeyId: AWS.config.credentials.accessKeyId,
      Plaintext: 'gp-alias'
    };
    
    kms.encrypt(params, function(err, data) {
      if (err) console.log(err, err.stack); // an error occurred
      else     console.log(data);           // successful response
      /*
      data = {
      CiphertextBlob: <Binary String>, // The encrypted data (ciphertext).
      KeyId: "arn:aws:kms:us-west-2:111122223333:key/1234abcd-12ab-34cd-56ef-1234567890ab"// The ARN of the CMK that was used to encrypt the data.
      }
      */
    });
  });
});