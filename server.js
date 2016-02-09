var express = require('express'),
	exphbs = require('express-handlebars'),
	http = require('http'),
	mongoose = require('mongoose'),
	twitter = require('ntwitter'),
	routes = require('./routes'),
	config = require('./config'),
	newTweetHandler = require('./utils/newTweetHandler');

var app = express();
var port = process.env.PORT || 8080;

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.disable('etag');

mongoose.connect('mongodb://localhost/react-tweets');

var twitterConfig = new twitter(config.twitter);

app.get('/', routes.index);

app.get('/page/:page/:skip', routes.page);

app.use("/", express.static(__dirname + "public/"));

var server = http.createServer(app).listen(port);

var socketIO = require('socket.io').listen(server);

twitterConfig.stream('statuses/filter', {track: 'javascript, #javascript, #js, reactjs'}, function(stream){
	newTweetHandler(stream, socketIO);
});