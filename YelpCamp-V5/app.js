const seedDB                = require("./seeds"),
      express               = require("express"),
      app                   = express(),
      bodyParser            = require("body-parser"),
      mongoose              = require("mongoose"),
      Campground            = require("./models/campground"),
      Comment               = require("./models/comment");
      User                  = require('./models/user'),
      passport              = require("passport"),
      passportLocalMongoose = require("passport-local-mongoose");

const commentRoutes         = require("./routes/comments"),
      campgroundRoutes      = require("./routes/campgrounds"),
      indexRoutes           = require("./routes/index");

mongoose.connect("mongodb://localhost/yelp_camp", {useNewUrlParser: true, useUnifiedTopology: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static("public"));
seedDB();

// Passport Configurations
app.use(require("express-session")({
    secret: "Moryso is the best Node-js Developer in the universe",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//To display only specific content when not logged in
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
})

app.use(indexRoutes);
app.use(campgroundRoutes);
app.use(commentRoutes);

app.listen(3000, function(req, res){
    console.log("YelpCamp server running on port 3000")
})