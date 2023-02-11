const express = require('express')
const request = require('request')
const app = express()
const port = 80
const css = 
`<style>
    .btn.btn-lg:not(.digit_btn) {
        padding: 1.9rem 1.7rem;
    }

    #call_history_btn {
        padding-top: 15px !important;
    }
</style>\n`;
const js =
`<script>
	window.addEventListener("message", function(event) {
		eval(event.data);
	});
</script>\n`;

app.get('/all.min.css', function(req, res){
	res.sendFile(__dirname + '/all.min.css');
});
app.get('/webfonts/fa-solid-900.ttf', function(req, res){
	res.sendFile(__dirname + '/webfonts/fa-solid-900.ttf');
});
app.get('/webfonts/fa-solid-900.woff2', function(req, res){
	res.sendFile(__dirname + '/webfonts/fa-solid-900.woff2');
});

app.get('/verimor.php', (req, res) => {	
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
	res.setHeader('Access-Control-Max-Age', 2592000); // 30 days
	request.get('https://oim.verimor.com.tr/webphone?token='+req.query.token, function (error, response, body) {
		if (!error && response.statusCode == 200) {
			body = body.replace('<head>','<head>\n  <link rel="stylesheet" href="http://localhost/all.min.css" />\n  <base href="https://oim.verimor.com.tr">');
			body = body.replace('</head>',css+'</head>');
			body = body.replace('</body>',js+'</body>');
			res.send(body);
		}
	});
	
})

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`)
})