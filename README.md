# AWS Lambda Exercices

This is a work in progress.  Therefore, please be patient as I continue iterating and figuring out a simple process for Lambda development.  My overall goal is to craft a workflow using NodeJS that solves many of the basic problems every app needs.  


---

## Workflow

I'm still in the process of perfecting this but so far here is my process.

Steps 1 - 4
```language-powerbash
[Create an API] => [Create a Resource (aka Endpoint)] => [Assign a Lambda function] => [Test]
```



---

## AWS Lambda Stack

- [AWS Cloudwatch](https://console.aws.amazon.com/cloudwatch/home) for measuring API / Lambda performance.
- [AWS Kinesis](https://console.aws.amazon.com/kinesis/home) for sending messages between different AWS services.
- NodeJS for [AWS Lambda](https://console.aws.amazon.com/lambda/home) development.
- [AWS API Gateway](https://console.aws.amazon.com/apigateway/home) for endpoints (/users, /myaccount, /profile, etc).
- [AWS S3](https://console.aws.amazon.com/s3/home) for versioning and storage.
- NPM [Jake](https://www.npmjs.com/package/jake) for automating bash scripts and [awscli](https://aws.amazon.com/cli/) commands.
- [AWS CodeCommit](https://console.aws.amazon.com/console/home) for private git repo.
- [AWS IAM](https://console.aws.amazon.com/console/home) for Identity Management and Governance.


