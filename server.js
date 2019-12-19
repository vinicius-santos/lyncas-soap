const express = require('express');
var bodyParser = require('body-parser');
var xml = require('fs').readFileSync('./HelloService.wsdl', 'utf8');
var soap = require('soap');
var app = express();

var myService = {
    Hello_Service: {
        Hello_Port: {
            sayHello: function(args) {
                console.log('sayHello called!');
                return {
                    greeting: 'Hello '+args.firstName.$value+'!'
                };
            }
        }
    }
};


//http server example
// var server = http.createServer(function(request, response) {
// 	response.end('404: Not Found: ' + request.url);
// });

// server.listen(8000);
// soap.listen(server, '/wsdl', myService, xml, function() {
// 	console.log('server initialized');
// });

//express server example
//body parser middleware are supported (optional)
app.use(
	bodyParser.raw({
		type: function() {
			return true;
		},
		limit: '5mb'
	})
);

app.listen(8001, function() {
	//Note: /wsdl route will be handled by soap module
	//and all other routes & middleware will continue to work
	soap.listen(app, '/wsdl/test', myService, xml, function() {
		console.log('server initialized');
	});
});



