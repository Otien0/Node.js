var express = require('express')
var app = express()

app.get('/', function (req, res) {
    res.send('Hi there Moryso!')
})

app.get('/bye', function (req, res) {
    res.send('Goodbye!')
})

app.get('/dog', function (req, res) {
    console.log('SOMEONE MADE A REQUEST TO /DOG!!!!')
    res.send('WOOF!')
})

app.get('/r/:subredditName', function(req, res){
    var subreddit = req.params.subredditName
    res.send('WELCOME TO THE ' + subreddit.toUpperCase() + ' SUBREDDIT!')
})

app.get('/r/:subredditName/comments/:id/:title/', function(req, res){
    console.log(req.params)
    res.send('WELCOME TO THE COMMENTS PAGE')
})

app.get('*', function (req, res) {
    res.send('YOU ARE A STAR!!!')
})

app.listen(3000, function () {
    console.log('Server has started on port 3000')
})