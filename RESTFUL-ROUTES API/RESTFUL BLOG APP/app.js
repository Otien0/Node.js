var bodyParser = require("body-parser"),
    express    = require("express"),
    mongoose   = require("mongoose"),
    app        = express()
   
    

mongoose.connect("mongodb://localhost/restful_blog_app", {useNewUrlParser: true, useUnifiedTopology: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static("public"));

// Mongoose/model/config
var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now}
});

//compiling the schema into a model
var Blog = mongoose.model("Blog", blogSchema)

// RESTFUL ROUTES
app.get("/", function(req, res){
    res.redirect("/blogs")
});

app.get("/blogs", function(req, res){
    res.render("index")
});

app.listen(3000, function(req, res){
    console.log("Blog App running on port 3000")
});