# AWS command line for authenticating users

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