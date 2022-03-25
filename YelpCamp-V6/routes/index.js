const express    = require("express"),
      router     = express.Router(),
      passport   = require("passport"),
      User       = require("../models/user");

router.get("/", function(req, res){
    res.render("landing")
});

// AUTH ROUTES
router.get("/register", function(req, res){
    res.render("register")
});

//Handling User registration
router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username})
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            req.flash("error", err.message);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function(){
            req.flash("success", "Welcome to YelpCamp " + user.username);
            res.redirect("/campgrounds");
        })
    })
})

// LOGIN ROUTES
router.get("/login", function(req, res){
    res.render("login");
})
//Handling login using a middleware
router.post("/login", passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}), function(req, res){
});

//LOGOUT
router.get("/logout", function(req, res){
    req.logOut();
    req.flash("success", "Logged You Out!");
   res.redirect("/");
});

module.exports = router;
