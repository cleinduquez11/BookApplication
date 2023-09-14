const graphql = require('graphql');

const _ =require('lodash');

//In this file we are creating schema that needs to be use for graphql data processing

const { GraphQLObjectType,GraphQLString, GraphQLSchema, GraphQLID,GraphQLList, GraphQLInt} = graphql;


const Book = require('../model/book');
const Author = require('../model/author');
const { options } = require('../../../mern-exercise-tracker/backend/Routes/exercises');


const BookType =  new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
    id: {type: GraphQLID},
    name:{type: GraphQLString},
    genre: {type: GraphQLString},
    authorid:{type:GraphQLID},
    author:{
        type:AuthorType,
        resolve(parent, args){
            return Author.findById(parent.authorid);
        }
    
    
    }
    })
});

const AuthorType =  new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
    id: {type: GraphQLID},
    name:{type: GraphQLString},
    age: {type: GraphQLInt},
    books:{
        type:GraphQLList(BookType),
        resolve(parent, args){
            return Book.find({authorid:parent.id});
        }
    
    }
    })
});



//Root query are the entrypoint for you to query
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        FindBookById:{
            type:BookType,
            args: {id:{type:GraphQLID}},
            resolve(parent,args){
                return Book.findById(args.id);
                //return _.find(books,{id:args.id});

            }
        },
        FindAuthorById:{
            type:AuthorType,
            args: {id:{type:GraphQLID}},
            resolve(parent,args){

                return Author.findById(args.id);
              //  return _.find(authors,{id:args.id});

            }
        },
        books:{
            type:GraphQLList(BookType),
            resolve(parent,args){
              
                return Book.find({});
            }
        },
        authors:{
            type:GraphQLList(AuthorType),
            resolve(parent,args){
              
                
                return Author.find({});
            }
        }

    }
});



//Mutations are the Input and update Entry point of the GRAPHQL
const Mutation = new GraphQLObjectType({
    name:'Mutation',
    fields: {
        addAuthor: {
            type:AuthorType,
            args: {
                    name: {type: GraphQLString},
                    age: {type: GraphQLInt}
                },
                resolve(parent,args){
                    let author = new Author({
                        name: args.name,
                        age: args.age
                    });

                     return author.save();
                }
            
        },
        addBook: {
            type: BookType,
            args: {
                name:{type:GraphQLString},
                genre:{type:GraphQLString},
                authorid:{type:GraphQLID}
            },
            async resolve(parent,args){
                let book = new Book({
                    name: args.name,
                    genre: args.genre,
                    authorid: args.authorid
                });

                 return await book.save();
            }
        },

        editBook: {
            type: BookType,
            args: {
                id:{type:GraphQLString},
                name:{type:GraphQLString},
                genre:{type:GraphQLString},
                authorid:{type:GraphQLID}
            },
           async resolve(parent,args){

              await Book.findByIdAndUpdate(args.id,
                    {
                        name: args.name,
                        genre:args.genre,
                        authorid: args.authorid

                    }
                    );

                return await Book.findById(args.id);

            }
        },
        editAuthor: {
            type: AuthorType,
            args: {
                id:{type:GraphQLString},
                name:{type:GraphQLString},
                age:{type:GraphQLInt},
                
            },
           async resolve(parent,args){

              await Author.findByIdAndUpdate(args.id,
                    {
                        name: args.name,
                        age: args.age,
                    
                    }
                    );

                return await Author.findById(args.id);

            }
        },

        deleteBook: {
            type: BookType,
            args: {
                id:{type:GraphQLString},
            },
           async resolve(parent,args){

                
            return await Book.findByIdAndDelete(args.id);
                
            }
        },

        deleteAuthor: {
            type: AuthorType,
            args: {
                id:{type:GraphQLString}
                
            },
           async resolve(parent,args){


            

            return await Author.findByIdAndDelete(args.id);

            }
        },



       
    }
})


module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});
