# AWS command line for authenticating users

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



# Run Commands



```language-powerbash
aws cognito-idp admin-initiate-auth --user-pool-id <pool_id> --client-id <client_id> --auth-flow ADMIN_NO_SRP_AUTH --auth-parameters USERNAME=<username>,PASSWORD=<password> --region <region>
```

```language-powerbash
aws cognito-idp admin-respond-to-auth-challenge --user-pool-id <pool_id> --region <region> --client-id <client_id> --challenge-name NEW_PASSWORD_REQUIRED --challenge-responses NEW_PASSWORD=<new-password>,USERNAME=<username> --session <session-key>
```

```language-powerbash
aws cognito-idp sign-up --client-id <client-id> --username <username> --password <password> --user-attributes Name=email,Value=<email> --region <region>
```

```language-powerbash
aws cognito-idp confirm-sign-up --client-id <client-id> --username <username> --confirmation-code <confirmation-code> --region <region>
```

```language-powerbash
aws cognito-idp admin-initiate-auth --user-pool-id <pool-id> --client-id <client-id> --auth-flow ADMIN_NO_SRP_AUTH --auth-parameters USERNAME=<username>,PASSWORD=<password> --region <region>
```



---



# Resources

- [Find AWS Cognito Pool ID](https://console.aws.amazon.com/cognito/users/?region=us-east-1#/)
- [AWS Create Named Profiles](http://docs.aws.amazon.com/cli/latest/userguide/cli-multiple-profiles.html)
- [Create temporary SMS](http://sms-receive.net/)
- [Create temporary Email](https://www.mailinator.com/v2/inbox.jsp?zone=public&query=a)
- [User Pool Aliases](http://docs.aws.amazon.com/cognito/latest/developerguide/user-pool-settings-attributes.html#user-pool-settings-aliases)
