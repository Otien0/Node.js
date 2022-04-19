var express = require('express')
var app = express()

app.get('/', function(req, res){
    res.send('Hi there, Welcome to my Assignment!')
})

app.get('/speak/:animal', function(req, res){
    var sounds = {
        pig: 'oink',
        cow: 'Moo',
        dog: 'Woof Woof!',
        cat: 'I hate you human',
        goldfish: 'aye!'
    }
    var animal = req.params.animal.toLowerCase()
    var sound = sounds[animal]
    res.send('The ' + animal + " says '" + sound + "'")
})

app.get('/repeat/:message/:times', function(req, res){
    var message = req.params.message
    var times = req.params.times
    var result = ''

    for(var i = 0; i < times; i++){
        result += message + ' '
    }
    res.send(result)
})

app.get('*', function(req, res){
    res.send('Sorry, page not found... What are you doing with your life?')
})

app.listen(3001, function(){
    console.log('Now serving your app on port 3001')
})