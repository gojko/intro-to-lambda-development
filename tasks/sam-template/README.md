# Preparation -- create a bucket for deployments

```bash
aws s3api create-bucket --bucket <DEPLOYMENT_BUCKET_NAME> --region <AWS_REGION>
```

# Step 1: package and upload code
  
```bash
aws cloudformation package --template-file template.yaml --output-template-file output.yaml --s3-bucket <DEPLOYMENT_BUCKET_NAME> --region <AWS_REGION>
```

# Step 2: deploy

```bash
aws cloudformation deploy --capabilities CAPABILITY_IAM --template-file output.yaml --stack-name <STACK_NAME> --region <AWS_REGION>
```

# Step 3: get stack outputs

```bash
aws cloudformation describe-stacks --query Stacks[].Outputs --output text --stack-name <STACK_NAME> --region <AWS_REGION>
```

