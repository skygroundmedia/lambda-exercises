var params = {}

/*
	To create a new role, you need these parameters
*/
params.role = {
	role_name:          "appname-awsservice-role",
	trust_policy:       "aws_policies/trust-role-policy.json",
	policy_name:        "appname-awservice-policy",
	permissions_policy: "aws_policies/permissions-role-policy.json"
}

params.lambdaPolicy = {
	"Version": "2012-10-17",
	"Statement": [
		{
			"Effect": "Allow",
			"Action": [
				"apigateway:*"
			],
			"Resource": [
				"arn:aws:logs:*:*:*"
			]
		},
		{
			"Effect": "Allow",
			"Action": [
				"apigateway:*"
			],
			"Resource": [
				"arn:aws:apigateway:us-east-1::/restapis/*/stages/dev"
			]
		}
	]
}

module.exports = params;