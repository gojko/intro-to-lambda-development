/*global module*/
module.exports = function buildForm(form) {
	'use strict';
	const fields = Object.keys(form.fields).map(field => `<input type="hidden" name="${field}" value="${form.fields[field]}"/>`).join('\n');
	return `
		<html>
		<head>
			<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
		  </head>
		  <body>
		  <form action="${form.url}" method="post" enctype="multipart/form-data">
			${fields}
			File:
			<input type="file"   name="file" /> <br />
			<input type="submit" name="submit" value="Upload to Amazon S3" />
		  </form>
		</html>
	`;
};
