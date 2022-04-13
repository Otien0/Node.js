const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect("mongodb://localhost/yelp_camp", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 25; i++) {
        const random25 = Math.floor(Math.random() * 25);
        const price = Math.floor(Math.random() * 10) + 10;
        const camp = new Campground({
            author: '6256dde10fc21b06d6749e61',
            location: `${cities[random25].city}, ${cities[random25].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'This camping site in Kenya even offers you a sundowner experience as you watch the sunset with other travellers as well as a bonfire. If you would like to enjoy a relaxing weekend without having to travel too far away from town, then a Wilderbeast camp is the best place to camp.The garden at the camp is very relaxing.',
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random25].longitude,
                    cities[random25].latitude,
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/self-hosted/image/upload/v1649860187/YelpCamp/zjw3ztkgjai2fgbuen43.jpg',
                    filename: 'YelpCamp/vaqjuohnqebigakdgki3'
                },
                {
                    url: 'https://res.cloudinary.com/self-hosted/image/upload/v1649860187/YelpCamp/qezp8qztz1uuhveqgmy5.jpg',
                    filename: 'YelpCamp/stpgwysdsuxeipf7j8qu'
                }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})