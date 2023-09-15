import { gql, useQuery } from "@apollo/client";
import React, { Component } from "react";
import { Get_Books } from "../queries/queries";

function DisplayBooks() {
  const { loading, error, data } = useQuery(Get_Books);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return data.books.map(({ id, name }) => (
    <li id="book-lists" key={id}>
      {name}
    </li>
  ));
}

export default class Booklist extends Component {
  render() {
    return (
      <>
        <div className="container">
          <h1>BookList</h1>

          <ul>
            <DisplayBooks />
          </ul>
        </div>
      </>
    );
  }
}
