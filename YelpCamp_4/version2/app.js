var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose")

mongoose.connect("mongodb://localhost/yelp_camp", { useNewUrlParser: true, useUnifiedTopology: true })
app.use(bodyParser.urlencoded({ extended: true }))
app.set("view engine", "ejs")
app.use(express.static("public"));

// SetUp SCHEMA
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
})

//compiling the schema into a model
var Campground = mongoose.model("Campground", campgroundSchema)

// Campground.create(
//     {
//         name: "Camp Malta", 
//         image: "https://i.imgur.com/uEepnRVb.jpg",
//         description: "Camp friendly to your wallet. You will get a tent, cooking utensils, refrigeration, cutlery, gas burners, jikos, a barbeque burner, and meeting facilities like chairs and whiteboards. Facilities which are provided at an additional fee include charcoal, firewood for the camp fire, sleeping bags, cooking gas and a cook or a chef."
// }, function(err, campground){
//     if(err){
//         console.log(err)
//     } else{
//         console.log("NEWLY CREATED CAMPGROUND:")
//         console.log(campground)
//     }
// })


app.get("/", function (req, res) {
    res.render("landing")
})

//INDEX ROUTE- shows all campgrounds
app.get("/campgrounds", function (req, res) {
    //Get all campgrounds from DB
    Campground.find({}, function (err, allCampgrounds) {
        if (err) {
            console.log(err)
        } else {
            res.render("index", { campgrounds: allCampgrounds })
        }
    })

})

//CREATE ROUTE-- Add new campground to DB
app.post("/campgrounds", function (req, res) {
    //get data from form and add to campgrounds array
    var name = req.body.name
    var image = req.body.image
    var desc = req.body.description
    var newCampground = { name: name, image: image, description: desc }
    //campgrounds.push(newCampground)
    Campground.create(newCampground, function (err, newlyCreated) {
        if (err) {
            console.log(err)
        } else {
            //redirect back to campgrounds page
            res.redirect("/campgrounds")
        }
    })
})

//NEW ROUTE-- show form to create new campground
app.get("/campgrounds/new", function (req, res) {
    res.render("new.ejs")
})

//SHOW ROUTE-- shows more info about one campground
app.get("/campgrounds/:id", function (req, res) {
    //find the campground with provided ID
    Campground.findById(req.params.id, function (err, foundCampground) {
        if (err) {
            console.log(err)
        } else {
            //render show template with that campgound
            res.render("show", { campground: foundCampground })
        }
    })
})

app.listen(3000, function (req, res) {
    console.log("YelpCamp server serving on port 3000")
})