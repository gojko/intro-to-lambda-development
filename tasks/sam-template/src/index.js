'use strict';
const htmlResponse = require('./html-response');

exports.handler = (event, context) => {
	const stage = event.requestContext.stage,
		formText = `
			<html><body>
			<h1>Register Food Preferences</h1>
			<form method="post" action="/${stage}/submit">
				<input placeholder="name" name="name" required/><br/>
				<p>Do you like ${process.env.FOOD_TYPE}</p>
				<input type="radio" name="food" value="yes" checked><label>Love it</label></input><br/>
				<input type="radio" name="food" value="no"><label>Hate it</label></input><br/>
				<input type="submit" name="SUBMIT"/>
			</form>
			</body></html>
		`;
	return Promise.resolve(htmlResponse(formText));
};
