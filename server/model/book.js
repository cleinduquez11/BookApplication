const mongoose = require('mongoose');


//This class is responsible for making the Eloquent BOOK model in MongoDB
const Schema = mongoose.Schema;


const bookSchema = new Schema({
    name: String,
    genre:String,
    authorid:String
});

module.exports = mongoose.model('Book', bookSchema);