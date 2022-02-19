const API = require('claudia-api-builder'),
	api = new API();
api.registerAuthorizer('MyCognitoAuth', {
  providerARNs: [process.env.COGNITO_PROVIDER_ARN]
});
api.get('/unlocked', request => 'This is public');

api.post('/lockedMessages', request => {
	const claims = request.context.authorizer && request.context.authorizer.claims,
		username = claims && claims['cognito:username'];

  return doSomethingUseful(request);
}, { cognitoAuthorizer: 'MyCognitoAuth' })

api.get('/signin', request => 'Signed in');
module.exports = api;
