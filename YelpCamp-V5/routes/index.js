const express = require("express"),
      router  = express.Router();

router.get("/", function(req, res){
    res.render("landing")
});



// AUTH ROUTES
router.get("/register", function(req, res){
    res.render("register")
});

//Handling User signup
router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username})
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err)
            return res.render("register")
        }
        passport.authenticate("local")(req, res, function(){
            res.redirect("/campgrounds")
        })
    })
})

// LOGIN ROUTES
router.get("/login", function(req, res){
    res.render("login")
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
   res.redirect("/");
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login")
}

module.exports = router;
