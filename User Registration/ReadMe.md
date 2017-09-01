# AWS command line for authenticating users

Amazon Cognito offers two primary features: User Pools and Federated Identity.


## User Pools
User Pools are scalable user directory services that you can use to add authentication and authorization to mobile and web apps.


## Federated Identity

Federated Identity is an identity broker that generate temporary access after user has been authenticated.

---

# Managing Tokens

AWS Cognito uses tokens to authenticate users and provide them with the access they need. After a client authenticates itself, it will receive 3 tokens.

1. **ID Token** is used to authenticate back-end services.
- **Access Token** are used to edit a user's profile.
- **Refresh Token** is used to refresh the ID Token and the Access Token.



---



# Getting Started

## Step 1
Install the necessary node libraries using NPM.
```
npm install
```



## Step 2
Create a ```.env``` file and paste these configuration keys:
```
AWS_PROFILE=MY_AWS_PROFILE
POOL_ID=MY_POOL_ID
CLIENT_ID=MY_CLIENT_ID
AWS_ACCESS_KEY_ID=NA
AWS_SECRET_ACCESS_KEY=NA
AWS_REGION=us-east-1
```

If you need a refresher on how to acquire these configuration keys, visit the resources below.



---



# Cognito Commands


## Sign Up
```language-powerbash
jake aws:signup[e@mailinator.com,xxxxxx]
```


## Sign Up Confirmation
```language-powerbash
jake aws:signup-response[d@mailinator.com,xxxxxx]
```


## Authenticate User
```language-powerbash
jake cognito:auth[e@mailinator.com,P@ssw0rd]
```


## Admin Respond to Auth Challenge
```language-powerbash
jake cognito:auth-response[e@mailinator.com,P@ssw0rd,XXXsessionkeyXXX]
```



---



# Resources

- [Find AWS Cognito Pool ID](https://console.aws.amazon.com/cognito/users/?region=us-east-1#/)
- [AWS Create Named Profiles](http://docs.aws.amazon.com/cli/latest/userguide/cli-multiple-profiles.html)
- [Create temporary SMS](http://sms-receive.net/)
- [Create temporary Email](https://www.mailinator.com/v2/inbox.jsp?zone=public&query=a)
- [User Pool Aliases](http://docs.aws.amazon.com/cognito/latest/developerguide/user-pool-settings-attributes.html#user-pool-settings-aliases)
