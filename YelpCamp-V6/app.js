const seedDB                = require("./seeds"),
      express               = require("express"),
      app                   = express(),
      bodyParser            = require("body-parser"),
      mongoose              = require("mongoose"),
      Campground            = require("./models/campground"),
      Comment               = require("./models/comment");
      User                  = require('./models/user'),
      flash                 = require("connect-flash"),
      path                  = require("path"),
      { campgroundSchema, reviewSchema }  = require('./schemas.js'),
      passport              = require("passport"),
      methodOverride        = require("method-override"),
      passportLocalMongoose = require("passport-local-mongoose"),
      catchAsync            = require('./utils/catchAsync'),
      ExpressError          = require('./utils/ExpressError'),
      Review                = require("./models/review");

      
const commentRoutes         = require("./routes/comments"),
      campgroundRoutes      = require("./routes/campgrounds"),
      indexRoutes           = require("./routes/index");

mongoose.connect("mongodb://localhost/yelp_camp", {useNewUrlParser: true, useUnifiedTopology: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
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


const validateCampground = (req, res, next) => {
    const { error } = campgroundSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}

const validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}

//REVIEWS POST-ROUTE
app.post('/campgrounds/:id/reviews', validateReview, catchAsync(async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    const review = new Review(req.body.review);
    campground.reviews.push(review);
    await review.save();
    await campground.save();
    res.redirect("/campgrounds/${campground._id}");
}))

//REVIEWS DELETE-ROUTE
app.delete('/campgrounds/:id/reviews/:reviewId', catchAsync(async (req, res) => {
    const { id, reviewId } = req.params;
    await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    res.redirect("/campgrounds/${id}");
}))

app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = 'Oh No, Something Went Wrong!'
    res.status(statusCode).render('error', { err })
})


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`YelpCamp server running on port ${PORT}`);
  });

// app.listen(3000, function(req, res){
//     console.log("YelpCamp server running on port 3000")
// })