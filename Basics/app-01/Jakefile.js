var util = require('util');

desc('Archive app and upload to S3.');
task('default', [], function (name_of_app, bucket, awscli_profile) {
  console.log('Jake Start.');
  var task = jake.Task['app:archive'];
      task.invoke.apply(task, [name_of_app, bucket, awscli_profile])
});

namespace('app', function () {
  desc('Archive app for upload.');
  task('archive', [], function (name_of_app, bucket, awscli_profile) {
    console.log("Archive Starting.");
    var cmds = [ util.format('zip -r %s *', name_of_app) ];
    jake.exec(cmds, { printStdout: false }, function(){
      console.log("Archive Complete.");
      var task = jake.Task['app:upload'];
          task.invoke.apply(task, [name_of_app, bucket, awscli_profile])
    })
  });

  desc('Upload a local .zip file to an AWS S3 bucket.');
  task('upload', { async: true }, function (name_of_app, bucket, awscli_profile) {
    console.log("Upload Start.");
    var cmds = [ util.format('aws s3 cp %s.zip s3://%s --profile %s', name_of_app, bucket, awscli_profile) ];
    jake.exec(cmds, { printStdout: false }, function () {
      console.log("Upload Complete.");
      complete();
    });
  });
});
