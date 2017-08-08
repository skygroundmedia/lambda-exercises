# WAV to FLAC

This project will help you create a process that makes it easy to convert WAV files to FLAC files using AWS S3, AWS Lambda, and AWS Transcoder. 

---

# Getting Started


```
npm install
```

This package installs ```dotenv```. This is where you will include your aws configuration profile.
```
AWSCLI_PROFILE=my_profile.
```

If you've never created a profile before, run this command. Make sure to include your access id, secret key, region (ex: ```us-east-1```, ```us-west-1```) and ```json``` for your output.

```
aws configure --profile my_profile
```

---


# Package your lambda function for deployment


## Method 1

This is an OS X, mac specific command that allows you to create a zip-file of your project.

```
npm run predeploy
```

## Method 2

If you're very particular about you want to upload, this example will show you how to get granular with archiving your app.
```
jake app:archive
```


---




# Resources

- [Converting WAV to FLAC using AWS Transcoder](http://www.chrisjmendez.com/2017/08/07/converting-wav-to-mp4-he-aac-using-elastic-transcoder/)
- [Serverless for Beginners](https://acloud.guru/course/serverless-for-beginners/dashboard)
- [Serverless Tube](https://github.com/ServerlessHeroes/serverlesstube/tree/master/lab-1/lambda/video-transcoder)
