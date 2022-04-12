const express    = require("express"),
      router     = express.Router(),
      passport   = require("passport"),
      catchAsync = require('../utils/catchAsync'),
      User       = require("../models/user");

router.get("/", (req, res) => {
    res.render("landing")
});

// AUTH ROUTES
router.get("/register", (req, res) => {
    res.render("users/register")
});

//Handling User registration
// router.post("/register", function(req, res){
//     var newUser = new User({username: req.body.username})
//     User.register(newUser, req.body.password, function(err, user){
//         if(err){
//             req.flash("error", err.message);
//             return res.render("register");
//         }
//         passport.authenticate("local")(req, res, function(){
//             req.flash("success", "Welcome to YelpCamp " + user.username);
//             res.redirect("/campgrounds");
//         })
//     })
// })
router.post('/register', catchAsync(async (req, res, next) => {
    try {
        const { email, username, password } = req.body;
        const user = new User({ email, username });
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, err => {
            if (err) return next(err);
            req.flash('success', 'Welcome to Yelp Camp' + user.username);
            res.redirect('/campgrounds');
        })
    } catch (e) {
        req.flash('error', e.message);
        res.redirect('register');
    }
}));

// LOGIN ROUTES
router.get("/login", (req, res) => {
    res.render("users/login");
})
//Handling login using a middleware
router.post('/login', passport.authenticate('local', {
    failureFlash: true,
    failureRedirect: '/login' }), (req, res) => {
        req.flash('success', 'welcome back' + user.username);
        const redirectUrl = req.session.returnTo || '/campgrounds';
        delete req.session.returnTo;
        res.redirect(redirectUrl);
})

//LOGOUT
router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success', "Goodbye!");
    res.redirect('/campgrounds');
})

module.exports = router;
