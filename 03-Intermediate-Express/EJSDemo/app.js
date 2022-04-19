var express = require("express")
var app = express()

app.use(express.static("public")) // For CSS Files
app.set("view engine", "ejs") //To Render .ejs files

app.get("/",function(req, res){
    res.render("home")
})

app.get("/fallinlovewith/:thing", function(req, res){
    var thing = req.params.thing
    res.render("love", {thingVar: thing})
})

app.get("/posts", function(req, res){
    var posts = [
        {title: "Post 1", Author: "Moryso"},
        {title: "Life in The Slums", Author: "Otieno"},
        {title: "Life in The Estates", Author: "Oduor"}
    ]
    res.render("posts", {posts: posts})
})

app.listen(3002, function(){
    console.log("Server Listening to port 3002")
})
