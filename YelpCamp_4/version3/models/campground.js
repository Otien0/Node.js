var mongoose = require('mongoose');

// SetUp SCHEMA
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
    comments: [
        {
           type: mongoose.Schema.Types.ObjectId,
           ref: "Comment"
        }
    ]
})

//compiling the schema into a model
module.exports = mongoose.model("Campground", campgroundSchema);