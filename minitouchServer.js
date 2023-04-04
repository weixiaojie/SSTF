const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const p = require('child_process');

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

var io = require('socket.io').listen(server);

const net = require('net');

let width;
let height;

//发送触摸数据
let client = new net.Socket();
client.connect(1111, 'localhost');
client.setEncoding('utf8');
client.on('data', (chunk) => {
    console.log("接收到了数据：" + chunk);
    chunk.split('\n').forEach(item=>{
        if(item.indexOf('^')!=-1){
            width = item.split(' ')[2];
            height = item.split(' ')[3];
        }
    });
});
client.on('error', (e) => {
    console.log(e.message);
});

//const io = new Server(server);
io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
    socket.on('touchDown', (msg) => {
        let x = msg.x * width, y = msg.y * height;
        var d1 = "d 0 " + Math.floor(x) + " " + Math.floor(y) + " 50\n";
        console.log(`${msg.x}x${width},${msg.y}x${height}`);
        console.log(d1);
        client.write(d1);
        client.write('c\n');
    });
    socket.on('touchUp', (msg) => {
        client.write('u 0\n');
        client.write('c \n');
    });
    socket.on('move', (msg) => {
        let x = msg.x * width, y = msg.y * height;
        var d1 = "m 0 " + Math.floor(x) + " " + Math.floor(y) + " 50\n";
        client.write(d1);
        client.write('c\n');
    });
});

server.listen(3000, () => {
    console.log('listening on *:3000');
});