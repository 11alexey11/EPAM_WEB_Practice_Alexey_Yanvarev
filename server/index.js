const express = require('express')
const app = express()
const http = require('http').createServer(app);
const socket = require('socket.io')(http);
const cors = require('cors');
let usercount = 1;

app.use(cors());

//app.use(express.static('../client/dist/index.html'));

app.get('/index.html', (req, res) => {
    res.sendFile('index.html', { root: '../client/dist'});
});

app.get('/style.css', (req, res) => {
    res.sendFile('style.css', { root: '../client/dist'});
});

app.get('/bundle.js', (req, res) => {
    res.sendFile('bundle.js', { root: '../client/dist'});
});

app.get('/favicon.png', (req, res) => {
    res.sendFile('favicon.png', { root: '../client'});
});

app.get('/index.js', (req, res) => {
    res.sendFile(__dirname + '/index.js');
});

app.get('/', (req, res) => {
    res.sendFile('index.html', { root: '../client/dist'});
});


  
http.listen(8080, () => {
    console.log('listening on *:8080');
});
