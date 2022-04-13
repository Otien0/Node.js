if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const express               = require("express"),
      app                   = express(),
      bodyParser            = require("body-parser"),
      mongoose              = require("mongoose"),
      ejsMate               = require('ejs-mate'),
      User                  = require('./models/user'),
      flash                 = require("connect-flash"),
      path                  = require("path"),
      passport              = require("passport"),
      methodOverride        = require("method-override"),
      passportLocalMongoose = require("passport-local-mongoose"),
      catchAsync            = require('./utils/catchAsync'),
      ExpressError          = require('./utils/ExpressError'),
      session               = require('express-session'),
      seedDB                = require("./seeds"),
      mongoSanitize         = require('express-mongo-sanitize'),
      helmet                = require('helmet');

// const dbUrl                 = process.env.DB_URL;
const dbUrl                 = process.env.DB_URL || "mongodb://localhost/yelp_camp";
const MongoStore            = require('connect-mongo');
const campgroundRoutes      = require("./routes/campgrounds"),
      userRoutes            = require("./routes/users"),
      reviewRoutes          = require('./routes/reviews');

const secret = process.env.SECRET || 'thisshouldbeabettersecret!';

const store = new MongoStore({
    mongoUrl: dbUrl,
    secret,
    touchAfter: 24 * 3600
});

store.on("error", (e) => {
    console.log("SESSION STORE ERROR", e)
})

const sessionConfig = {
    store,
    name: 'session',
    secret,
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        // secure: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}

// "mongodb://localhost/yelp_camp"
mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

app.use(bodyParser.urlencoded({extended: true}));
app.engine('ejs', ejsMate)
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(session(sessionConfig));
app.use(flash());
app.use(mongoSanitize({
    replaceWith: '_'
}))
// app.use(helmet());
// seedDB();

// const scriptSrcUrls = [
//     "https://stackpath.bootstrapcdn.com/",
//     "https://maxcdn.bootstrapcdn.com/bootstrap/",
//     "https://www.bootstrapcdn.com/",
//     "https://getbootstrap.com/",
//     "https://api.tiles.mapbox.com/",
//     "https://api.mapbox.com/",
//     "https://kit.fontawesome.com/",
//     "https://cdnjs.cloudflare.com/",
//     "https://cdn.jsdelivr.net/",
//     "https://www.jsdelivr.com/"
// ];
// const styleSrcUrls = [
//     "https://kit-free.fontawesome.com/",
//     "https://stackpath.bootstrapcdn.com/",
//     "https://maxcdn.bootstrapcdn.com/bootstrap/",
//     "https://www.bootstrapcdn.com/",
//     "https://getbootstrap.com/",
//     "https://api.mapbox.com/",
//     "https://api.tiles.mapbox.com/",
//     "https://fonts.googleapis.com/",
//     "https://use.fontawesome.com/",
// ];
// const connectSrcUrls = [
//     "https://api.mapbox.com/",
//     "https://a.tiles.mapbox.com/",
//     "https://b.tiles.mapbox.com/",
//     "https://events.mapbox.com/",
// ];
// const fontSrcUrls = [];
// app.use(
//     helmet.contentSecurityPolicy({
//         directives: {
//             defaultSrc: ["'self'"],
//             connectSrc: ["'self'", ...connectSrcUrls],
//             scriptSrc: ["'unsafe-inline'", "'self'", ...scriptSrcUrls],
//             styleSrc: ["'self'", "'unsafe-inline'", ...styleSrcUrls],
//             workerSrc: ["'self'", "blob:"],
//             objectSrc: [],
//             imgSrc: [
//                 "'self'",
//                 "blob:",
//                 "data:",
//                 "https://res.cloudinary.com/morys02/",
//                 "https://images.unsplash.com/",
//                 "https://www.google.com/search?q=campgrounds+kenya&tbm=isch&ved=2ahUKEwj0uMH_x5H3AhXF4YUKHR8ODIUQ2-cCegQIABAA&oq=campgrounds+kenya&gs_lcp=CgNpbWcQAzIHCCMQ7wMQJ1AAWABg6ai8BmgIcAB4AIABoQSIAYoGkgEHMi0xLjUtMZgBAKoBC2d3cy13aXotaW1nwAEB&sclient=img&ei=IwhXYrSbIcXDlwSfnLCoCA&bih=569&biw=1280/"
//             ],
//             fontSrc: ["'self'", ...fontSrcUrls],
//         },
//     })
// );

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
app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
})

app.use("/", userRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use('/campgrounds/:id/reviews', reviewRoutes)

app.get('/', (req, res) => {
    res.render('home')
});


app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found', 404))
})

app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = 'Oh No, Something Went Wrong!'
    res.status(statusCode).render('error', { err })
})


// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//     console.log(`YelpCamp server running on port ${PORT}`);
//   });

app.listen(3000, () => {
    console.log("YelpCamp server running on port 3000")
})