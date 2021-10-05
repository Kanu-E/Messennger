var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var http = require('http').Server(app)
var io = require('socket.io')(http)
var mongoose = require('mongoose')

app.use(express.static(__dirname))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true }))

var dbUrl = 'mongodb+srv://Emeka:Emeka@cluster0.gbpa5.mongodb.net/Learning-node?retryWrites=true&w=majority'

var messages = [
    {name:'Tim', message:'Hello'},
    {name:'Mark', message:'Hi'}
];

app.get('/messages', (req, res)=>{
    res.send(messages)
})

app.post('/messages', (req, res)=>{
    messages.push(req.body)
    io.emit('message', req.body)
    res.sendStatus(200)
})

io.on('connection', (socket)=>{
    console.log('a user is connected')
})

mongoose.connect(dbUrl, (err)=>{
    console.log('Mongo db connection', err)
})

var server = http.listen(3000,()=>{
    console.log('listening on', server.address().port);
})

