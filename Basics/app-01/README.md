# App 01

This app is designed to show you how to create, package and publish a Lambda function using AWS command line interface.

If you're unfamiliar with AWS Lambda, [read this tutorial first](http://www.chrisjmendez.com/2017/02/19/aws-lambda-on-osx/).



---



# Getting Started

## Development

### Step 1 - Install Jake packager

This project relies on [Jake](https://www.npmjs.com/package/jake) to archive and upload files to AWS S3. Jake is similar to Ruby Rake or Java Ant. It simply helps you create command lines that complete chores.

The reason why I'm installing Jake globally –and not as a devDependency– is so that we don't package up any unnecessary dependencies to S3. 

```language-powerbash
npm install -g jake
```



### Step 2 - Install 3rd party libraries

Change directory:
```language-powerbash
cd ./path/to/Basics/app-01/
```

Install any external libraries found within ```package.json```
```language-powerbash
npm install
```



---



## Using Jake for Deployment

Since our app is using 3rd party NodeJS libraries, we cannot copy and paste our Lambda code to the browser directly. Instead, we must archive the files into .zip and upload them using the ```aws``` client.

You can run the ```jake``` app which will bundles the files within a .zip and upload it to AWS S3. 

```language-powerbash
jake default[name_of_zip,name_of_s3_bucket,name_of_awscli_profile]
```

*Pay special attention to the fact that there are no spaces between params.*



---



# Troubleshooting

* If you're unfamiliar with Rake, [read this tutorial](http://www.chrisjmendez.com/2016/07/31/rails-5-tasks/)
* If you want to learn more about Lambda functions, read this article on [Lambda Development](http://www.chrisjmendez.com/2017/02/19/aws-lambda-on-osx/)
* If you do not have a default AWS configuration or a profile, then read this tutorial to learn [How to configure your AWS client](http://www.chrisjmendez.com/2017/01/01/aws-working-with-aws-client/).
* If you do not have the right permissions to upload files, read this tutorial on [How to create Policy Files for S3](http://www.chrisjmendez.com/2017/03/06/aws-copy-from-one-s3-bucket-to-another/).
* If you do not have AWS client installed on your desktop computer, read [How to install AWSCLI using Homebrew](http://www.chrisjmendez.com/2017/02/18/aws-installing-aws-client-using-homebrew/) 




---



# Resources

* [Using Jake](https://howtonode.org/intro-to-jake)
* [Jake Docs](https://www.npmjs.com/package/jake)

