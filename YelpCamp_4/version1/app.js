var express = require("express")
var app = express()
var bodyParser = require("body-parser")

app.use(bodyParser.urlencoded({ extended: true }))
app.set("view engine", "ejs")

var campgrounds = [
    { name: "Camp Malta", image: "https://i.imgur.com/uEepnRVb.jpg" },
    { name: "Wildebeest Eco Camp", image: "https://i.imgur.com/crBESiab.jpg" },
    { name: "Camp Ya Kanzi", image: "https://i.imgur.com/a785ZXCb.jpg" },
    { name: "Rapids Camp, Sagana", image: "https://i.imgur.com/8G5IehWb.jpg" },
    { name: "Malewa Bush Ventures", image: "https://i.imgur.com/1ZqCkDEb.jpg" },
    { name: "Camp Carnelleyâ€™s", image: "https://i.imgur.com/eTOogftb.jpg" },
    { name: "El Karama", image: "https://i.imgur.com/4RSDCkkb.jpg" },
    { name: "Kiboko Camp", image: "https://i.imgur.com/J9Gp9cKb.jpg" },
    { name: "Mamba Village", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSt1SFOCVjBA6ZCNnE6B2RQ_JCMb-tg2rl_2CEW8T0fRMejYLiQ" },
    { name: "Thompson Falls Lodge Camp", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQno76laIU6zk5ZBR9aqyaSrJRNl3W7AwpsHKBKfCfOpQV4_E5N" },
    { name: "Olorgesailie", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcScR8tgzL-7xe5EZGWOAOlLl7lDUo6s7KWAzSxQ4jdUlGFMYzuG" },
    { name: "Hell\'s Gate Gorge and National Park", image: "https://i.imgur.com/WFyTL7yb.jpg" }
]

app.get("/", function (req, res) {
    res.render("landing")
})

app.get("/campgrounds", function (req, res) {
    res.render("campgrounds", { campgrounds: campgrounds })
})

app.post("/campgrounds", function (req, res) {
    //get data from form and add to campgrounds array
    var name = req.body.name
    var image = req.body.image
    var newCampground = { name: name, image: image }
    campgrounds.push(newCampground)
    //redirect back to campgrounds page
    res.redirect("/campgrounds")
})

app.get("/campgrounds/new", function (req, res) {
    res.render("new.ejs")
})

app.listen(3000, function (req, res) {
    console.log("YelpCamp server serving on port 3000")
})