Twitterbot
=

Twitterbot is a demo 

---

# Stack

* AWS Lambda
* AWS KMS for managing secret keys
* NodeJS
* JakeJS for managing shell scripts, command line client and AWS SDK

---

# Setting up your Environment

Unlike the AWS Command Line Console, the project uses the [AWS SDK for NodeJS](https://aws.amazon.com/sdk-for-node-js/). The main different is how you set up your credentials. While using the command line, you can specify which credentials to use through the command line parameter ```--profile``` but that feature isn't available within the SDK. Instead, you will need to modify the credentials for ```default``` mode. 


Open up ```~/.aws/credentials``` and make sure to use the ```[default]``` profile.
```language-powerbash
[default]
aws_access_key_id = ADD_AWS_SDK_ACCESS_KEY_ID
aws_secret_access_key = ADD_AWS_SECRET_ACCESS_KEY
```

Open up ```~/.aws/config``` and make sure to use the ```[default]``` profile.
```language-powerbash
[default]
region=us-east-1
output = json
```



# Step 1 - Get Twitter Keys

Visit [http://dev.twitter.com](http://dev.twitter.com) and create a new app. 

You will then need to get 

```
Consumer Key (API Key)
```

```
Consumer Secret (API Secret)
```

```
Access Token
```

```
Access Token Secret
```

---