import { Box, GlobalStyles, Grid, Paper, Typography } from "@mui/material";
import AddBook from "./components/AddBook";
import BookList, { BookInfo } from "./components/Booklist";
import "./index.css";
import Add from "./components/AddBook";
import DisplayBooks from "./components/Booklist";

function App() {
  return (
    <>
      <GlobalStyles
        styles={{
          body: { backgroundColor: "#F5CDDE", padding: "20px 20px" },
        }}
      />

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          flexGrow: 1,
          justifyContent: "center",
          gap: "50px",
          padding: "20px, 20px",
        }}
      >
        <Box>
          <DisplayBooks />
        </Box>

        <Box>
          <Paper
            elevation={6}
            sx={{
              padding: "20px",
              textAlign: "center",
            }}
          >
            <Typography variant="h4">Add a Book</Typography>
            <Add />
          </Paper>
        </Box>
      </Box>
    </>
  );
}

export default App;
