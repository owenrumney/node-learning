var express = require('express')
    , stylus = require('stylus')
    , io = require('socket.io').listen(app);



function compile(str, path) {
	return stylus(str)
	.set('filename', path)
	.use(nib());
}

var app = express();
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.bodyParser());
app.use(express.logger('dev'));
app.use(stylus.middleware(
{
	src: __dirname + '/public',
	compile: compile
}));

app.use(express.static(__dirname + '/public'));

app.get('/index', function (req, res) {
    res.render('index');
});

io.sockets.on('connection', function (socket) {
    socket.emit('news', { message: 'Hello world' });
    socket.on('newMessage', function (data) {
        socket.emit('message', {
            id: data['id'],
            name: data['name'],
            message: data['message']
        });
    });
});

app.listen(3000);