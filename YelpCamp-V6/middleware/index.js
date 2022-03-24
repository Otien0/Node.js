const Campground    = require("../models/campground"),
      Comment       = require("../models/comment"),
      middlewareObj = {};


middlewareObj.checkCampgroundOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        Campground.findById(req.params.id, function(err, foundCampground){
            if(err){
                res.redirect("back")
            }
            //Check if Logged in user owns the campground
            else if(foundCampground.author.id.equals(req.user._id))
            {
                next();
            }
            else {
                res.redirect("back");
            }
        });
    }
    else {
        res.redirect("back");
    }
    
};

middlewareObj.checkCommentOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err){
                res.redirect("back")
            }
            //Check if Logged in user owns the comment
            else if(foundComment.author.id.equals(req.user._id))
            {
                next();
            }
            else {
                res.redirect("back");
            }
        });
    }
    else {
        res.redirect("back");
    }
    
};

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = middlewareObj;