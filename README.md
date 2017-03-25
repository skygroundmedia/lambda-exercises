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

- [Cloudwatch](https://us-west-2.console.aws.amazon.com/cloudwatch/home?region=us-- [AWS Kinesis](https://aws.amazon.com/kinesis/) for monitoring events and changes.
- NodeJS for [AWS Lambda](https://aws.amazon.com/lambda/) development.
- [AWS API Gateway](https://aws.amazon.com/api-gateway/) for endpoints (/users, /myaccount, /profile, etc).
- [AWS S3](https://aws.amazon.com/s3/) for versioning and storage.
- NPM [Jake](https://www.npmjs.com/package/jake) for automating bash scripts and [awscli](https://aws.amazon.com/cli/) commands.
- [AWS CodeCommit](https://aws.amazon.com/codecommit/) for versioning
west-2#logs) for Lambda performance monitoring and measurement.
- [AWS IAM](https://aws.amazon.com/iam/) for Identity Management and Governance.


