import React, { Component, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";

import { Get_Books, Get_Author, Add_Book } from "../queries/queries";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";

function Add() {
  const [add, { loading, error, reset }] = useMutation(Add_Book, {
    refetchQueries: [
      {
        query: Get_Books,
      },
    ],
  });

  const [Name, setName] = useState("");
  const [Genre, setGenre] = useState("");

  const [authorid, setAuthorID] = useState("");

  if (loading) return <p>Submitting...</p>;
  if (error) return <p>Submission error! ${error.message}</p>;

  const handleChange = (event) => {
    // console.log(event.target.value);
    setAuthorID(event.target.value);
  };

  const submit = (e) => {
    e.preventDefault();
    // console.log(Name, Genre, authorid);
    add({
      variables: {
        name: Name,
        genre: Genre,
        authorid: authorid,
      },
    });
  };
  return (
    <form onSubmit={submit}>
      <div id="form-input">
        <TextField
          required
          variant="outlined"
          type="text"
          name=""
          id=""
          placeholder="Book Name"
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div id="form-input">
        <TextField
          variant="outlined"
          required
          type="text"
          name=""
          id=""
          placeholder="Book Genre"
          onChange={(e) => setGenre(e.target.value)}
        />
      </div>
      <div id="form-input">
        <InputLabel id="demo-simple-select-label">Author</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          value={authorid}
          label="Author"
          onChange={handleChange}
        >
          <MenuItem value="None">
            <em>None</em>
          </MenuItem>
          <MenuItem value="6502937e2e9e34e7acf4ee7b">
            <em>Maggie</em>
          </MenuItem>
          <MenuItem value="650293902e9e34e7acf4ee7d">
            <em>Lucinda</em>
          </MenuItem>
        </Select>
      </div>
      <div id="form-input">
        <Button type="submit" variant="outlined" color="secondary">
          Add Book
        </Button>
      </div>
    </form>
  );
}

export default class AddBook extends Component {
  render() {
    return (
      <>
        <Paper
          elevation={6}
          sx={{
            padding: "30px",
          }}
        >
          <Typography variant="h4" component="p">
            Add a Book
          </Typography>
          <Add />
        </Paper>
      </>
    );
  }
}
