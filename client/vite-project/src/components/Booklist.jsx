import { gql, useMutation, useQuery } from "@apollo/client";
import React, { Component } from "react";
import { Delete_Book, Get_Books } from "../queries/queries";
import {
  Button,
  Card,
  Chip,
  ClickAwayListener,
  Paper,
  Typography,
} from "@mui/material";

import "../index.css";

function DisplayBooks() {
  const { loading, error, data } = useQuery(Get_Books);
  const [delBook, { reset }] = useMutation(Delete_Book, {
    refetchQueries: [
      {
        query: Get_Books,
      },
    ],
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return data.books.map(({ id, name }) => (
    <Paper
      onClick={() => {
        delBook({
          variables: {
            id: id,
          },
        });
      }}
      square={false}
      sx={{
        width: 300,
      }}
      id="book-lists"
      key={id}
    >
      <Typography variant="h6" component="p">
        {name}
      </Typography>
    </Paper>
  ));
}

export default class Booklist extends Component {
  render() {
    return (
      <>
        <Paper
          elevation={6}
          sx={{
            width: 400,
          }}
          className="container"
        >
          <h1>BookList</h1>

          <ul>
            <DisplayBooks />
          </ul>
        </Paper>
      </>
    );
  }
}
