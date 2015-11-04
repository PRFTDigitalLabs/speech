/// <reference path="typings/node/node.d.ts"/>
var pkg = require(__dirname + '/../package.json'),
    path = require('path'),
    express = require('express'),
    _ = require('underscore'),

    app = express(),
	http = require('http').Server(app),
	io = require('socket.io')(1337),
	NounProject = require('the-noun-project'),
	clients = [ ],
	nounProject = new NounProject({
	    key: '92553a56dfc741798f105284679f5d1c',
	    secret: '1c4810770fa54eb18a609be348c793f2'
	});



var client = io;


client.on('connection', function(socket){
	
	console.log('connected to Client');

	socket.on('newTerm', function (term) {
		console.log('QUERY FOR', term);
		
        	term = encodeURIComponent(term);
        	console.log(term)

		    nounProject.getIconsByTerm(term, {limit: 1}, function (err, data) {
			    if (!err) {
	        		client.emit('message',JSON.stringify( data ));
	        		console.log(JSON.stringify(data));
			    }
			});

	    
	});
	
	socket.on('disconnect', function(){
		console.log('sorry to see you go');
	});

});


var staticPath = __dirname.replace('/server', '/' + pkg.config.buildFolder);

app.use(express.static(staticPath));



app.get('*', function(request, response) {

    response.sendfile('./' + pkg.config.buildFolder + '/index.html');

});
var server = app.listen((process.env.PORT || pkg.config.serverPort), function() {

    var port = server.address().port;

    console.log("%s serving from %s on port: %s", pkg.name, staticPath, port);
});


module.exports = app;