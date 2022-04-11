const express               = require("express"),
      app                   = express(),
      bodyParser            = require("body-parser"),
      mongoose              = require("mongoose"),
      User                  = require('./models/user'),
      bcrypt                = require('bcrypt'),
      session               = require('express-session');


const requireLogin = (req, res, next) => {
    if (!req.session.user_id) {
        return res.redirect('/login')
    }
    next();
}

mongoose.connect("mongodb://localhost/Auth_DB2", {useNewUrlParser: true, useUnifiedTopology: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(require("express-session")({
    secret: "Moryso is the best Node-js Developer in the universe",
    resave: false,
    saveUninitialized: false
}));


app.get("/", (req, res) => {
    res.render("home");
})

// AUTH ROUTES
app.get("/register", (req, res) => {
    res.render("register")
});

//Handling User SignUp > Post Request
app.post('/register', async (req, res) => {
    const { password, username } = req.body;
    const user = new User({ username, password })
    await user.save();
    req.session.user_id = user._id;
    res.redirect('/')
})

// LOGIN ROUTES
app.get("/login", (req, res) => {
    res.render("login")
})
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const foundUser = await User.findAndValidate(username, password);
    if (foundUser) {
        req.session.user_id = foundUser._id;
        res.redirect('/secret');
    }
    else {
        res.redirect('/login')
    }
})

//LOGOUT
app.post('/logout', (req, res) => {
    req.session.user_id = null;
    // req.session.destroy();
    res.redirect('/');
})

app.get('/secret', requireLogin, (req, res) => {
    res.render('secret')
})
app.get('/topsecret', requireLogin, (req, res) => {
    res.send("TOP SECRET!!!")
})

app.listen(3000, (req, res) => {
    console.log("Auth-Demo server running on port 3000")
})