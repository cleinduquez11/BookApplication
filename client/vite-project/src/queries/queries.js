
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
export{Get_Books, Add_Book, Get_Author, Delete_Book};
