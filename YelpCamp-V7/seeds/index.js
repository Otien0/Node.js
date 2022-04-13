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
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '623be4ff42b0af2f006c3118',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Campi ya Kanzi was born in 1975 when Luca first set foot in the Chyulu. It was a childhood dream for 20 years, and become a reality in 1995 when Luca & Antonella moved to the Chyulu permanently. It took a few years to build, during which time we lived in a small tent for more than 24 months… The toilet was a pit in the bush and the shower a bucket on a tree, with stars as the canopy… Luca misses it, Antonella still damages his credit card in retaliation!',
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/self-hosted/image/upload/v1649773314/YelpCamp/vaqjuohnqebigakdgki3.jpg',
                    filename: 'YelpCamp/vaqjuohnqebigakdgki3'
                },
                {
                    url: 'https://res.cloudinary.com/self-hosted/image/upload/v1649773315/YelpCamp/stpgwysdsuxeipf7j8qu.jpg',
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