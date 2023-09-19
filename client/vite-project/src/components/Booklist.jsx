import { gql, useMutation, useQuery } from "@apollo/client";
import React, {
  Component,
  useEffect,
  useState,
  createContext,
  useContext,
} from "react";
import { Delete_Book, Get_Books } from "../queries/queries";
import {
  Box,
  Button,
  Card,
  Chip,
  ClickAwayListener,
  Grid,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";

import "../index.css";
const BookContext = createContext();

export function BookInfo() {
  const book = useContext(BookContext);
  const [delBook, { reset }] = useMutation(Delete_Book, {
    refetchQueries: [
      {
        query: Get_Books,
      },
    ],
  });
  // const [id, setId] = useState("");
  // console.log(book.id);
  return (
    <>
      <Typography variant="h4">Book Information</Typography>
      <Paper
        sx={{
          padding: "20px",
        }}
      >
        <Typography variant="h6">
          {book.name}
          <span>
            <button
              onClick={() => {
                delBook({
                  variables: {
                    id: book.id,
                  },
                }).then((e) => {
                  window.location.reload();
                });
              }}
            >
              Delete
            </button>
          </span>
        </Typography>
      </Paper>
    </>
  );
}

export default function DisplayBooks() {
  const [book, setBook] = useState({
    id: "",
    name: "",
    genre: "",
    author: {
      id: "",
      name: "",
    },
  });
  const { loading, error, data } = useQuery(Get_Books);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <>
      <BookContext.Provider value={book}>
        <Box
          sx={{
            display: "flex",
            gap: "50px",
          }}
        >
          <Box
            sx={{
              flexGrow: 1,
            }}
          >
            <Paper
              elevation={6}
              sx={{
                padding: "10px",
              }}
            >
              <BookInfo />
            </Paper>
          </Box>
          <Box>
            <Paper
              elevation={6}
              sx={{
                padding: "10px",
              }}
            >
              {" "}
              <Typography variant="h4" component="p">
                Book List
              </Typography>
              {data.books.map(({ id, name }) => (
                <Box
                  sx={{
                    flexDirection: "row",
                  }}
                  key={id}
                >
                  <Paper
                    onClick={() =>
                      setBook((previousState) => {
                        return { ...previousState, name: name, id: id };
                      })
                    }
                    square={false}
                    sx={{
                      width: "auto",
                    }}
                    id="book-lists"
                    key={id}
                  >
                    <Typography variant="h6" component="p" key={id}>
                      {name}
                    </Typography>
                  </Paper>
                </Box>
              ))}
            </Paper>
          </Box>
        </Box>
      </BookContext.Provider>
    </>
  );
}
