/// <reference path="typings/node/node.d.ts"/>
var pkg = require(__dirname + '/../package.json'),
    path = require('path'),
    express = require('express'),
    _ = require('underscore'),

    app = express(),
	http = require('http').Server(app),
	io = require('socket.io')(http, {origins:'localhost localhost:3000 localhost*'}),
	NounProject = require('the-noun-project'),

	webSocketsServerPort = 1337,
	clients = [ ],
	nounProject = new NounProject({
	    key: '92553a56dfc741798f105284679f5d1c',
	    secret: '1c4810770fa54eb18a609be348c793f2'
	});



var client = io.of('client');


client.on('connection', function(socket){
	
	console.log('connected to Client');

	socket.on('newTerm', function (term) {
		console.log('QUERY FOR', term);
		
        if (term.type === 'utf8') { // accept only text
        	term = encodeURIComponent(term);


		    var result;
		    nounProject.getIconsByTerm(term, {limit: 1}, function (err, data) {
			    if (!err) {
	        		client.emit('message',JSON.stringify( data ));
			    }
			});

        }

	    
	});
	
	socket.on('disconnect', function(){
		console.log('sorry to see you go');
	});

});




var staticPath = __dirname.replace('/server', '/' + pkg.config.buildFolder);

app.use(express.static(staticPath));



app.get('*', function(request, response) {

	response.setHeader("Access-Control-Allow-Origin", "*");
	response.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    response.sendfile('./' + pkg.config.buildFolder + '/index.html');

});
var server = app.listen((process.env.PORT || pkg.config.serverPort), function() {

    var port = server.address().port;

    console.log("%s serving from %s on port: %s", pkg.name, staticPath, port);
});


module.exports = app;