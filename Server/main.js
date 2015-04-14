var socket = require("socket.io")(8080);

io.on('connection', function (socket) {
    io.emit('this', { will: 'be received by everyone'});

    socket.on('test', function (from, msg) {
        console.log('I received a message by ', from, ' saying ', msg);
    });

    socket.on('disconnect', function () {
        io.emit('user disconnected');
    });
});