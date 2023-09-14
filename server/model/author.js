const mongoose = require('mongoose');

//This class is responsible in Making Eloquent AUTHOR Model in MongoDB

const Schema = mongoose.Schema;


const authorSchema = new Schema({
    name: String,
    age:Number,
    
});
module.exports = mongoose.model('Author', authorSchema);