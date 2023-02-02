var express = require('express');
var { graphqlHTTP } = require('express-graphql');
var { buildSchema } = require('graphql');

const _ =require('lodash');


var books = [
    {'name': 'Holy father and the goblin', 'genre': 'romance', 'id': '1', 'authorid':'1'},
    {'name': 'Barney and the chocolate factry', 'genre': 'animation', 'id': '2','authorid':'2'},
    {'name': 'The first airbender and the beautybeast', 'genre': 'musical/wild', 'id': '3','authorid':'3'},
    {'name': 'marmalade and thupe', 'genre': 'tragedy/comedy', 'id': '4','authorid':'1'},
    {'name': 'Snow white and the last supper', 'genre': 'action', 'id': '5','authorid':'2'},
    {'name': 'Pussycat mouse', 'genre': 'spg', 'id': '6','authorid':'3'},
];

var authors = [
    {'name': 'Vince Lacar', 'age': 64, 'id': '1'},
    {'name': 'wangyu ngaldung', 'age': '58', 'id': '2'},
    {'name': 'Sherwin Harvey', 'age': '50', 'id': '3'},
];
// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
type Book {
    id: ID,
    name:String,
    genre:String,
    authorid:String,
    author: Author
},

type Author {
    id: ID,
    name:String,
    age:Int,
    books: [Book]
},

type Query {
    getbook(id:ID):Book,
    getauthor(id:ID):Author,
    book:Book
}

`);

// The root provides a resolver function for each API endpoint
var root = {
getbook: ({id})=> {
    //console.log()
    var book = _.find(books,{id})
    console.log(book);
    var author = _.find(authors,{id:book['authorid']});
    console.log(author);
    book['author'] = author;
    return  book;
},
book: ()=>{
    return books;
},
getauthor: ({id})=> {
    var author = _.find(authors,{id})
  //  console.log(author);
    var book = _.filter(books,{authorid:author['id']});
    console.log(book);
    author['books'] = book;
    return author;
},
};

var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at http://localhost:4000/graphql');