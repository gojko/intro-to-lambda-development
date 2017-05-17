# Create dynamo table 

aws dynamodb create-table --table-name dynamo-test \
  --attribute-definitions AttributeName=userid,AttributeType=S \
  --key-schema AttributeName=userid,KeyType=HASH \
  --provisioned-throughput ReadCapacityUnits=1,WriteCapacityUnits=1 \
  --query TableDescription.TableArn --output text

# Create new user

curl -H "Content-Type: application/json" -X POST --data @example.json <API-URL>/user

