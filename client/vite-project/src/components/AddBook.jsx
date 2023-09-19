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

export default function Add() {
  const [add, { loading, error, reset }] = useMutation(Add_Book, {
    refetchQueries: [
      {
        query: Get_Books,
      },
    ],
  });

  const [Name, setName] = useState("");
  const [Genre, setGenre] = useState("");
  const [Description, setDescription] = useState("");
  const [AuthorId, setAuthorId] = useState("");

  if (loading) return <p>Submitting...</p>;
  if (error) return <p>Submission error! ${error.message}</p>;

  const submit = (e) => {
    e.preventDefault();
    // console.log(Name, Genre, Description, AuthorId);
    add({
      variables: {
        name: Name,
        genre: Genre,
        authorid: AuthorId,
      },
    });
  };
  return (
    <form onSubmit={submit}>
      <div id="form-input">
        <TextField
          required
          variant="outlined"
          label="Book Name"
          type="text"
          name=""
          id=""
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div id="form-input">
        <TextField
          variant="outlined"
          label="Book Genre"
          required
          type="text"
          name=""
          id=""
          onChange={(e) => setGenre(e.target.value)}
        />
      </div>

      <div className="form-input">
        <TextField
          id="outlined-multiline-static"
          label="Book Description"
          // required
          multiline
          rows={4}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div id="form-input">
        <InputLabel id="demo-simple-select-label">Author</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          value={AuthorId}
          label="Author"
          onChange={(e) => setAuthorId(e.target.value)}
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
