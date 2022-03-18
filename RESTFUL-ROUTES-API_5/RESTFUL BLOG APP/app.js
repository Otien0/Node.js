var bodyParser = require("body-parser"),
    methodOverride = require('method-override'),
    expressSanitizer = require('express-sanitizer');
    express = require("express"),
    mongoose = require("mongoose"),
    app = express()



mongoose.connect("mongodb://localhost/restful_blog_app", { useNewUrlParser: true, useUnifiedTopology: true });
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressSanitizer()); //This one goes after bodyParser, as REQUIRED.
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(methodOverride('_method'));

// Mongoose/model/config
var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: { type: Date, default: Date.now }
});

//compiling the schema into a model
var Blog = mongoose.model("Blog", blogSchema)

// RESTFUL ROUTES
app.get("/", function (req, res) {
    res.redirect("/blogs");
});

// INDEX ROUTE
app.get("/blogs", function (req, res) {
    Blog.find({}, function (err, blogs) {
        if (err) {
            console.log("ERROR!");
        } else {
            res.render("index", { blogs: blogs });
        }
    });
});

// NEW ROTE
app.get("/blogs/new", function (req, res) {
    res.render("new");
});

// CREATE ROUTE
app.post("/blogs", function (req, res) {
    // create blog
    req.body.blog.body = req.sanitize(req.body.blog.body);
    Blog.create(req.body.blog, function (err, newBlog) {
        if (err) {
            res.render("new");
        } else {
            // then redirect back to index
            res.redirect("blogs");
        }
    });
});

// SHOW ROUTE
app.get("/blogs/:id", function (req, res) {
    Blog.findById(req.params.id, function (err, foundBlog) {
        if (err) {
            res.redirect("/blogs");
        } else {
            res.render("show", { blog: foundBlog });
        }
    });
});

// EDIT ROUTE
app.get("/blogs/:id/edit", function (req, res) {
    Blog.findById(req.params.id, function (err, foundBlog) {
        if (err) {
            res.redirect("/blogs");
        } else {
            res.render("edit", { blog: foundBlog });
        }
    });
});

// UPDATE ROUTE
app.put("/blogs/:id", function (req, res) {

    req.body.blog.body = req.sanitize(req.body.blog.body);

    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function (err, updatedBlog) {
        if (err) {
            res.redirect("/blogs");
        } else {
            res.redirect("/blogs/" + req.params.id);
        }
    });
});

// DELETE ROUTE
app.delete("/blogs/:id", function (req, res) {
    Blog.findByIdAndDelete(req.params.id, function (err) {
        if (err) {
            res.redirect("/blogs");
        } else {
            res.redirect("/blogs");
        }
    });
});



app.listen(3000, function (req, res) {
    console.log("Blog App running on port 3000");
});