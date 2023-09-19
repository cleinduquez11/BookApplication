
import { gql } from "@apollo/client";

const Get_Books = gql`
  query {
    books {
      id
      name
    }
  }
`;

const Add_Book = gql`
  mutation AddBook($name: String!, $genre: String!, $authorid: String!) {
    addBook(name: $name, genre: $genre, authorid: $authorid) {
      name
    }
  }
`;
const Get_Author = gql`
  query {
    authors {
      id
      name
    }
  }
`;

const Delete_Book = gql`
mutation($id:String!){
  deleteBook(id:$id){
    name
  }
}
`;

const Find_Book_By_Id = gql`
query($id:ID!){
  FindBookById(id:$id){
    id
    name
    author{
      id
      name
      books{
        name
      }
    }
  }
}
`;
export{Get_Books, Add_Book, Get_Author, Delete_Book, Find_Book_By_Id};
