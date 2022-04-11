var mongoose = require('mongoose');

// SetUp SCHEMA
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
    price: Number,
    location: String,
    author: {
            id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            },
            username: String
        },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ],
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Review'
        }
    ]
})

campgroundSchema.post('findOneAndDelete', async function (doc) {
    if (doc) {
        await Review.deleteMany({
            _id: {
                $in: doc.reviews
            }
        })
    }
})

//compiling the schema into a model
module.exports = mongoose.model("Campground", campgroundSchema);