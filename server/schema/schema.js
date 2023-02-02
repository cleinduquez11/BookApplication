const graphql = require('graphql');

const _ =require('lodash');

//In this file we are creating schema that needs to be use for graphql data processing

const { GrapQLObjectType,GraphQLString, GraphQLSchema} = graphql;

//dummy data 
var books = [
    {'name': 'Holy father and the goblin', 'genre': 'romance', 'id': '1'},
    {'name': 'Barney and the chocolate factry', 'genre': 'animation', 'id': '2'},
    {'name': 'The first airbender and the beautybeast', 'genre': 'musical/wild', 'id': '3'},
];
//Create a Graphql Object called Book
const BookType =  new GrapQLObjectType({
    name: 'Book',
    fields: () => ({
    id: {type: GraphQLString},
    name:{type: GraphQLString},
    genre: {type: GraphQLString}
    })
});


//Root query are the entrypoint for you to query
const RootQuery = new GrapQLObjectType({
    name: 'RootQueryType',
    fields: {
        book:{
            type:BookType,
            args: {id:{type:GraphQLString}},
            resolve(parent,args){
                return _.find(books,{id:args.id});



                //code to get data from db/other source
            }
        }
    }
});


module.exports = new GraphQLSchema({
    query: RootQuery
});
