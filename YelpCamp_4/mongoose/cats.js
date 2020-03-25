var mongoose = require("mongoose")
mongoose.connect("mongodb://localhost/cat_app", { useNewUrlParser: true, useUnifiedTopology: true});

var catSchema = new mongoose.Schema({
    name: String,
    age: Number,
    temparament: String
})

var Cat = mongoose.model("Cat", catSchema)

adding a new cat to the DB
var george = new Cat({
    name: "Mrs. Norris",
    age: 8,
    temparament: "Evil"
})

// george.$__save({}, (err, cat) =>  {
// george.save((err, cat) => {})
george.save(function (err, cat) {
    if(err){
        console.log("SOMETHING WENT WRONG")
    } else {
        console.log("WE JUST SAVED ANOTHER CAT TO THE DB:")
        console.log(cat)
    }
        
})

Cat.create({
    name: "Snow White",
    age: 12,
    temparament: "Bland"
}, function(err, cat){
    if(err){
        console.log(err)
    } else {
        console.log(cat)
    }
})

//retrieve all cats from the DB and console.log each one
Cat.find({}, function(err, cats){
    if(err){
        console.log("OH NO! ERROR AGAIN!!")
        console.log(err)
    } else {
        console.log("ALL THE CATS .....")
        console.log(cats)
    }
})