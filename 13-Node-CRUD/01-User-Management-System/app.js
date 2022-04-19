if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const express       = require('express'),
      app           = express(),
      mongoose      = require("mongoose"),
      dotenv        = require('dotenv'),
      morgan        = require('morgan'),
      bodyparser    = require("body-parser"),
      path          = require('path');

const dbUrl         = process.env.DB_URL || 'mongodb://localhost/user-management';
// const dbUrl      = "mongodb://localhost/user-management";

// log requests
app.use(morgan('tiny'));

// "mongodb://localhost/yelp_camp"
mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

// parse request to body-parser
app.use(bodyparser.urlencoded({ extended : true}))

// set view engine
app.set("view engine", "ejs")
//app.set("views", path.resolve(__dirname, "views/ejs"))

// load assets
app.use('/css', express.static(path.resolve(__dirname, "assets/css")))
app.use('/img', express.static(path.resolve(__dirname, "assets/img")))
app.use('/js', express.static(path.resolve(__dirname, "assets/js")))

// load routers
app.use('/', require('./server/routes/router'))

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`User-Management server running on port ${PORT}`);
});

// app.listen(3000, () => {
//     console.log("YelpCamp server running on port 3000")
// })
// app.listen(PORT, ()=> { console.log(`Server is running on http://localhost:${PORT}`)});