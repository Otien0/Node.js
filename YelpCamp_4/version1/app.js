var express = require("express")
var app = express()
var bodyParser = require("body-parser")

app.use(bodyParser.urlencoded({ extended: true }))
app.set("view engine", "ejs");
app.use(express.static("public"));

var campgrounds = [
    { name: "Camp Malta", image: "https://i.imgur.com/uEepnRVb.jpg" },
    { name: "Wildebeest Eco Camp", image: "https://i.imgur.com/crBESiab.jpg" },
    { name: "Camp Ya Kanzi", image: "https://i.imgur.com/a785ZXCb.jpg" },
    { name: "Rapids Camp, Sagana", image: "https://i.imgur.com/8G5IehWb.jpg" },
    { name: "Malewa Bush Ventures", image: "https://i.imgur.com/1ZqCkDEb.jpg" },
    { name: "Camp Carnelleyâ€™s", image: "https://i.imgur.com/eTOogftb.jpg" },
    { name: "El Karama", image: "https://i.imgur.com/4RSDCkkb.jpg" },
    { name: "Kiboko Camp", image: "https://i.imgur.com/J9Gp9cKb.jpg" },
    { name: "Mamba Village", image: "https://i.imgur.com/eUonOB7s.jpg" },
    { name: "Thompson Falls Lodge Camp", image: "https://i.imgur.com/OHTymcR.jpg" },
    { name: "Olorgesailie", image: "https://i.imgur.com/tyU7nrC.jpg" },
    { name: "Hell\'s Gate Gorge", image: "https://i.imgur.com/WFyTL7yb.jpg" }
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