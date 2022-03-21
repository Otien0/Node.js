var mongoose = require("mongoose");
const { getMaxListeners } = require("process");
mongoose.connect("mongodb://localhost/blog_demo", { useNewUrlParser: true, useUnifiedTopology: true });

// Post: title, content
var postSchema = new mongoose.Schema({
    title: String,
    content: String
});
var Post = mongoose.model("Post", postSchema);


// user: email, name
var userSchema = new mongoose.Schema({
    email: String,
    name: String,
    posts: [postSchema]
});
var User = mongoose.model("User", userSchema);

// var newUser = new User ({
//     email: "jacobothis@gmail.com",
//     name: "Jacob Odhiambo"
// });

// newUser.posts.push({
//     title: "How to master Nodejs",
//     content: "start by learning basic JavaScript first!!"
// });

// newUser.save(function(err, user){
//     if(err){
//         console.log(err);
//     } else{
//         console.log(user);
//     }
// });

// var newPost = new Post ({
//     title: "Node Deployment",
//     content: "Through Netlify servers"
// });
// newPost.save(function(err, post){
//     if(err){
//         console.log(err);
//     } else{
//         console.log(post);
//     }
// });

User.findOne({name: "Jacob Odhiambo"}, function(err, user){
    if(err){
        console.log(err);
    } else{
        user.posts.push({
            title: "Understanding Node.js",
            content: "Begin by mastering Express-js first!"
        });
    } user.save(function(err, user){
        if(err){
            console.log(err);
        } else {
            console.log(user);
        }
    });
});
