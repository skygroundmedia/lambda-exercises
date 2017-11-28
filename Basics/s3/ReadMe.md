# JakeJS + S3


## Getting Started

### Step 1 - Install Node

- Install [Node](https://nodejs.org/en/)


### Step 2 - Install AWS Cli

- Use Node Package Manager to install AWS SDK

```language-powerbash
npm install
```

### Step 3 - Create AWS Cli Profile

You first need to create an AWS profile on your local computer. Read this [tutorial](http://www.chrisjmendez.com/2017/01/01/aws-working-with-aws-client/) on how to create a local profile. 

### Step 4 - Modify ```aws.jake```

Once you create a local profile, open the file titled ```/jakelib/aws.jake``` and add your profile.

```language-javascript
var AWS_CREDENTIALS = {
	profile: "name_of_your_profile"
}
```


---



## Running Commands

This example shows you how to manage an S3 bucket.

Create a new bucket

```language-powerbash
jake s3:create[bucket_name]
```

Upload a file
```language-powerbash
 jake s3:upload[bucket_name,file]
```

List objects within a bucket
```language-powerbash
jake s3:list[bucket_name]
```



---
