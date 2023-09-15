var express = require('express');
var { graphqlHTTP } = require('express-graphql');
const cors  = require("cors");
const mongoose = require('mongoose');
const _ =require('lodash');
const schema = require('./schema/schema');


var app = express();
app.use(cors());

//This is the serverside code for making a GraphQL API using nodeJS


app.use(express.json());



//This part of the code is used call the API entry point of MONGODB
//Use environment variable to store the URI of the MongoDB instance
mongoose.connect("your-mongo-db-key");

//This is an IF check whether the database is connected or not
if (mongoose.ConnectionStates.connected) {
    console.log('MongoDB is Connected');
} else {
    console.log('MongoDB is not Connected');
}


//This is the part of the code that enables node js to create a Graphql API in NODE
app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true,
}));


//This is the part of the code that is responsible for firing up the code
app.listen(4000);
console.log('Running a GraphQL API server at http://localhost:4000/graphql');