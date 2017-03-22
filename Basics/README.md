Manually run Lambda on OSX
-

## Create and Configure AWS Access Credentials


Make sure Python is installed. If you get a response, then you're good.

```
python --version
```

Install the [Amazon Web Services Client](https://aws.amazon.com/sdk-for-node-js/) or [download](https://s3.amazon.com/aws-cli/awscli-bundle.zip
) it. 


Download the AWS Client Bundle
```language-bash
curl "https://s3.amazonaws.com/aws-cli/awscli-bundle.zip" -o "awscli-bundle.zip"
```

Unpack it
```language-bash
unzip awscli-bundle.zip 
```


Install it
```language-bash
sudo ./awscli-bundle/install -i /usr/local/aws -b /usr/local/bin/aws
```

Double check your work
```language-bash
aws --version
```


## Create default credentials using AWS configutor

Now it's time to configure your credentials by setting up the default AWS credentials 
```language-bash
aws configure --profile <create a profile name>
```

Test to see if your AWS is working properly
```language-bash
aws lambda list-functions --profile <name of the profile you want to use>
```


## Create a NodeJS function

Make sure the file name ultimately matches the name of your function.
```language-bash
vi getStatus.txt
```

Create this function
```language-javascript
/*
  //A. Event tells us what triggered this function
  //B. Context offers a few things
  Event describes the external stimulus that your function is responding too.  
    For example, if an S3 file change triggered the function, this event would
    include the bucket name and object key 

  Context helps you know when the function itself, or any callbacks have finished
    executing. 

    It also gives you useful information and access about the Lambda execution 
      environment.
  
    For example, you can use context to find the cloud-watch log stream associated
      with the function or use the client context property to learn more about
      who triggered this function
*/

console.log("A")
exports.handler = function(event, context){
console.log("B", event)
  
  context.done(null, "C");
  
}
```


## Upload the file

Amazon Lambda requires you to zip up javascript files.

```langage-bash
zip <name of zip>.zip <name of your javascript file>.js
```

### Create an IAM role 

This role creates permissions that will allow Lambda to execute our code. Go to [AWS > IAM > Roles > Attach Policy](https://console.aws.amazon.com/iam/home?region=us-west-2#roles) and choose ```AWSLambdaExecute (arn:aws:iam::aws:policy/AWSLambdaExecute)```.

You may need to attach a new policy.


#### Create and upload a new function

```langage-bash
aws lambda create-function \
#Pick a region otherwise it will resume to default
--region us-west-2 \
#This is the new name of the function recognized by Lambda
--function-name getStatus \
#Path to your zip file
--zip-file fileb://path/to/file.zip \
#Name of the role
--role arn:aws:iam::141896505695:role/role-devops \
#The handler name must match the --function name
--handler getStatus.handler \
#We're submitting a nodejs code
--runtime nodejs \
#This might require > 3 secs if the process is something like image manipulation
--timeout 3 \
--description "a simple explainer" \
#View the code execute
--debug
```

#### Execute a function with arguments

```langage-bash
aws lambda invoke-async \
--function-name getStatus \
--invoke-args /path/to/file/with/arguments.txt \
--debug
```

### Double check your work by looking at AWS Cloudwatch

Cloudwatch allows you to see a log of all events happening on your function. 

[My Cloudwatch from Region:Oregon](https://us-west-2.console.aws.amazon.com/cloudwatch/home?region=us-west-2#logs)


### Get the metadata about the function 

If you want to know where the URL of your function exists, try this command

```langage-bash
aws lambda get-function --function-name getStatus
```

### Update function
```langage-bash
aws lambda update-function-code \
--function-name getStatus \
--zip-file fileb://path/to/file.zip \
--publish
```


### Delete function
```langage-bash
aws lambda delete-function \
--function-name getStatus
```


```
 aws lambda create-function --function-name MakeThumbnail --region us-west-2 --zip-file fileb://./MakeThumbnail.zip --role arn:aws:iam::141896505695:role/role-devops --timeout 10 --memory-size 1024 --description "This will convert a file from a cc-user-profile-image and create a cc-user-profile-image-thumbnail" --handler MakeThumbnail.handler --runtime nodejs
```

---

# Method 3


Get a file from a server
```
arn:aws:lambda:us-east-1:141896505695:function:getUserProfileThumbnail
```


---


# Method 2

```language-javascript
sudo npm install --prefix=~/lambdaTestFunction aws-sdk
ls node_modules
sudo npm install aws-sdk -g

```


---


# Method 4

Testing out lambda commands on your local machine using [fakes3](https://github.com/jubos/fake-s3)

Install
``
gem install fakes3
```

Start server
```
fakes3 -r /mnt/fakes3_root -p 4567
```