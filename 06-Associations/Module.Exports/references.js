var mongoose = require("mongoose");
const { getMaxListeners } = require("process");
mongoose.connect("mongodb://localhost/blog_demo_2", { useNewUrlParser: true, useUnifiedTopology: true });

var Post = require("./models/post");

var User = require("./models/user");

// User.create({
//     email: "morrisotieno03@gmail.com",
//     name: "Morris Otieno"
// });

// Post.create({
//     title: "Mastering MongoDB",
//     content: "Start by learning the common DB's(SQL) first then come back to Mongodb"
// }, function(err, post){
//     User.findOne({email: "morrisotieno03@gmail.com"}, function(err, foundUser){
//         if(err){
//             console.log(err);
//         } else {
//             foundUser.posts.push(post);
//             foundUser.save(function(err, data){
//                 if(err){
//                     console.log(err);
//                 } else {
//                     console.log(data);
//                 }
//             });
//         }
//     });
// });

User.findOne({email: "morrisotieno03@gmail.com"}).populate("posts").exec(function(err, user){
    if(err){
        console.log(err);
    } else{
        console.log(user);
    }
});