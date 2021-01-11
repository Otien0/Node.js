var mongoose = require("mongoose");
const { getMaxListeners } = require("process");
mongoose.connect("mongodb://localhost/blog_demo_2", { useNewUrlParser: true, useUnifiedTopology: true });

var Post = require("./models/post");

var User = require("./models/user");

// // Post: title, content
// var postSchema = new mongoose.Schema({
//     title: String,
//     content: String
// });
// var Post = mongoose.model("Post", postSchema);


// // user: email, name
// var userSchema = new mongoose.Schema({
//     email: String,
//     name: String,
//     posts: [{
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "Post"
//     }
// ]
// });
// var User = mongoose.model("User", userSchema);

// User.create({
//     email: "morrisotieno03@gmail.com",
//     name: "Morris Otieno"
// });

Post.create({
    title: "Mastering MongoDB",
    content: "Start by learning the common DB's(SQL) first then come back to Mongodb"
}, function(err, post){
    User.findOne({email: "morrisotieno03@gmail.com"}, function(err, foundUser){
        if(err){
            console.log(err);
        } else {
            foundUser.posts.push(post);
            foundUser.save(function(err, data){
                if(err){
                    console.log(err);
                } else {
                    console.log(data);
                }
            });
        }
    });
});

// User.findOne({email: "morrisotieno03@gmail.com"}).populate("posts").exec(function(err, user){
//     if(err){
//         console.log(err);
//     } else{
//         console.log(user);
//     }
// });