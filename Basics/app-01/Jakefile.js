var util = require('util');

desc('Archive app and upload to S3.');
task('default', {async: true}, function (name_of_app, bucket, awscli_profile) {
  console.log('Jake Start.');
  function archive(){
    var archive = jake.Task['app:archive'];
    archive.addListener("start", function(){
      console.log("Archive Start.");
    })
    archive.addListener("complete", function(){
      console.log("Archive Complete.");
      upload()
    })
    archive.addListener("error", function(e){
      console.log("Archive Error: ", e.message, e.code);
    })
    archive.invoke.apply(archive, [name_of_app, bucket, awscli_profile]);
  }

  function upload(){
    var upload = jake.Task['app:upload'];
    upload.addListener("start", function(){
      console.log("Upload Start.")
    });
    upload.addListener("complete", function(){
      console.log("Upload Complete.")
    })
    upload.addListener("error", function(e){
      console.log("Upload Error: ", e.message, e.code);
    })
    upload.invoke.apply(upload, [name_of_app, bucket, awscli_profile])
    complete();
  }
  
  archive();
});

namespace('app', function () {
  desc('Archive app for upload.');
  task('archive', { async: true }, function (name_of_app, bucket, awscli_profile) {
    //Exclude the node_modules folder (not recommended)
    var node_modules = '-x "node_modules/\*"'
    //Exclude hidden files and single isolated files
    var exclude = '-x .\* -x "package.json" -x "Jakefile.js" -x \*.md '
    var cmds = [ util.format('zip -r %s * %s', name_of_app, exclude) ];
    jake.exec(cmds, { printStdout: false }, function(){
      complete();
    })
  });

  desc('Upload a local .zip file to an AWS S3 bucket.');
  task('upload', { async: true }, function (name_of_app, bucket, awscli_profile) {
    var cmds = [ util.format('aws s3 cp %s.zip s3://%s --profile %s', name_of_app, bucket, awscli_profile) ];
    jake.exec(cmds, { printStdout: false }, function () {
      complete();
    });
  });
});
