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
mongoose.promise = Promise

var Message = mongoose.model('Message', {
    name: String,
    message: String
})

app.get('/messages', (req, res)=>{
    Message.find({},(err, messages)=>{
        res.send(messages)
    })
})

app.post('/messages', async (req, res)=>{
    try {
        var message = new Message(req.body)
        var saved = await message.save()
        console.log(saved)
        var censored = await Message.findOne({message: 'badword'})
        if(censored)
                await message.remove({_id: censored.id})
        else
            io.emit('message', req.body)
            res.sendStatus(200)
    }catch(err){
        res.sendStatus(500)
        return console.error(err)
    }finally{
        console.log('message post called')
    }
})



io.on('connection', (socket)=>{
    console.log('a user is connected')
})

mongoose.connect(dbUrl, (err)=>{
    console.log('Mongo db connection', err)
})

var server = http.listen(3000, ()=>{
    console.log('listening on', server.address().port);
})

