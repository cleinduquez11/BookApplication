import React, { Component, useEffect, useState } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";

import { Get_Books, Get_Author, Add_Book } from "../queries/queries";

function GetAuthors() {
  const { loading, error, data } = useQuery(Get_Author);

  if (loading) return <option>Loading...</option>;
  if (error) return <option>Error : {error.message}</option>;

  return data.authors.map(({ id, name }) => <option key={id}>{name}</option>);
}

function Add() {
  const [add, { data, loading, error, reset }] = useMutation(Add_Book, {
    refetchQueries: [
      {
        query: Get_Books,
      },
    ],
  });
  const [name, setName] = useState("");
  const [genre, setGenre] = useState("");
  const [authorid, setAuthorID] = useState("");

  if (loading) return "Submitting...";
  if (error) return `Submission error! ${error.message}`;

  return (
    <>
      <form
        onSubmit={(e) => {
          console.log(name, genre, authorid);
          e.preventDefault();
          add({
            variables: {
              name: name,
              genre: genre,
              authorid: authorid,
            },
          });
        }}
      >
        <div>
          <input
            required
            type="text"
            name=""
            id=""
            placeholder="Book Name"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <input
            required
            type="text"
            name=""
            id=""
            placeholder="Book Genre"
            onChange={(e) => setGenre(e.target.value)}
          />
        </div>
        <div>
          <select
            required
            name="AuthorId"
            id="sel"
            onChange={(e) => setAuthorID(e.target.value)}
          >
            <option value="">Select Author</option>
            <GetAuthors />
          </select>
        </div>
        <div>
          <input type="submit" value="Add Book" />
        </div>
      </form>
    </>
  );
}

export default class AddBook extends Component {
  render() {
    return (
      <>
        <div className="container">
          <h1>Add a Book</h1>
          <Add />
        </div>
      </>
    );
  }
}
