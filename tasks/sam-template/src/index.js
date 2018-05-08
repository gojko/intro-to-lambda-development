'use strict';
const htmlResponse = require('./html-response');

exports.handler = (event, context) => {
	const stage = event.requestContext.stage,
		formText = `
			<html><body>
			<h1>SAM Register</h1>
			<form method="post" action="/${stage}/submit">
				<input placeholder="name" name="name" required/><br/>
				<input type="radio" name="food" value="meat" checked><label>Love meat</label></input><br/>
				<input type="radio" name="food" value="veg"><label>Hate meat</label></input><br/>
				<input type="submit" name="SUBMIT"/>
			</form>
			</body></html>
		`;
	return Promise.resolve(htmlResponse(formText));
};
