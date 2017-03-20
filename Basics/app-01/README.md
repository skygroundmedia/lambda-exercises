# Demo App 01

This app is designed to show you how to create, package and publish a Lambda function using AWS command line interface.

If you're unfamiliar with AWS Lambda, [read this tutorial first](http://www.chrisjmendez.com/2017/02/19/aws-lambda-on-osx/).


---



# Getting Started


## Development

### Install 3rd party libraries

Change directory
```language-powerbash
cd ./path/to/Basics/app-01/
```

Install any external libraries found within ```package.json```
```language-powerbash
npm install
```



---



## Deployment

Since we are using 3rd party libraries, we cannot copy and paste our javascript code into the browser directly. Instead, we must archive the files into .zip and upload them using the ```aws``` client.

### Zipping up files

Zip up all the files and folder (recursively) into a file named ```myapp.zip```.
```language-javascript
rake app:archive
```


### Uploading

I created a Rakefile to keep things looking pretty. If you're unfamiliar with Rake, [read this tutorial](http://www.chrisjmendez.com/2016/07/31/rails-5-tasks/).
```language-powerbash
rake app:upload
```



### 


---



# Troubleshooting

- If you want to learn more about Lambda functions, read this article on [Lambda Development](http://www.chrisjmendez.com/2017/02/19/aws-lambda-on-osx/)

- If you do not have a default AWS configuration or a profile, then read this tutorial to learn [How to configure your AWS client](http://www.chrisjmendez.com/2017/01/01/aws-working-with-aws-client/).

- If you do not have the right permissions to upload files, read this tutorial on [How to create Policy Files for S3](http://www.chrisjmendez.com/2017/03/06/aws-copy-from-one-s3-bucket-to-another/).

- If you do not have AWS client installed on your desktop computer, read [How to install AWSCLI using Homebrew](http://www.chrisjmendez.com/2017/02/18/aws-installing-aws-client-using-homebrew/) 
