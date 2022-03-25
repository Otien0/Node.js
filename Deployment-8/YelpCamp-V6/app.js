const seedDB                = require("./seeds"),
      express               = require("express"),
      app                   = express(),
      bodyParser            = require("body-parser"),
      mongoose              = require("mongoose"),
      Campground            = require("./models/campground"),
      Comment               = require("./models/comment");
      User                  = require('./models/user'),
      flash                 = require("connect-flash"),
      passport              = require("passport"),
      methodOverride        = require("method-override"),
      passportLocalMongoose = require("passport-local-mongoose"),
      PORT                  = process.env.PORT || 3000;
      
const commentRoutes         = require("./routes/comments"),
      campgroundRoutes      = require("./routes/campgrounds"),
      indexRoutes           = require("./routes/index");

mongoose.connect("mongodb://localhost/yelp_camp", {useNewUrlParser: true, useUnifiedTopology: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(methodOverride("_method"));
app.use(flash());
// seedDB();

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
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
})

app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

app.listen(PORT, () => {
    console.log(`Our app is running on port ${PORT}`);
  });
// app.listen(3000, function(req, res){
//     console.log("YelpCamp server running on port 3000")
// })