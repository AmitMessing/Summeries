var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var http = require('http');
var mongodb = require('mongodb');
var cons = require('consolidate');
var socket = require('socket.io');

//We need to work with "MongoClient" interface in order to connect to a mongodb server.
var MongoClient = mongodb.MongoClient;
// Connection URL. This is where your mongodb server is running.
var url = 'mongodb://localhost:27017/summeries';

// Use connect method to connect to the Server
MongoClient.connect(url, function(err, db) {
    if (err) {
        console.log('Unable to connect to the mongoDB server. Error:', err);
    }
    else {
        global.myDb = db;

        homeRoute(app);
        searchRoute(app);
        mediaRoute(app);
        userRoute(app);
        statisticsRoute(app);
    }
});

var homeRoute = require('./routes/home');
var searchRoute = require('./routes/search');
var mediaRoute = require('./routes/media');
var userRoute = require('./routes/user');
var statisticsRoute = require('./routes/statistics');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('html', cons.handlebars);

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'images/favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser({limit: '5mb'}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.set('port',process.env.PORT || 8080);

module.exports = app;

var server = http.createServer(app);
server.listen(app.get('port'), function(){
    console.log("Express server listening on port " + app.get('port'));
});

var io = socket.listen(server);
io.sockets.on('connection', function (client) {
    client.emit('messages',{hello:'world'});
    client.on('commentAdded', function(msg){
        client.broadcast.emit('commentAdded', {msg: msg});
    });
});