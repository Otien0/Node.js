var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


// SetUp SCHEMA
var campgroundSchema = new mongoose.Schema({
    title: String,
    image: String,
    description: String,
    price: Number,
    location: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
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