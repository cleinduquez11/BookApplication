import { Box, GlobalStyles, Grid } from "@mui/material";
import AddBook from "./components/AddBook";
import BookList from "./components/Booklist";
import "./index.css";
function App() {
  return (
    <>
      <GlobalStyles
        styles={{
          body: { backgroundColor: "#F5CDDE" },
        }}
      />

      <Grid container justifyContent="center" textAlign="center" gap={1}>
        <Grid xl={3} sm={1}>
          <Box
            mt={2}
            display={{ xs: "none", sm: "block" }}
            width="auto"
            height={300}
          >
            {/* <BookList />
            <AddBook /> */}
          </Box>
        </Grid>

        <Grid xl={3} sm={5}>
          <Box
            mt={2}
            display={{ xs: "none", sm: "block" }}
            width="auto"
            height={300}
          >
            <BookList />
            {/* <AddBook /> */}
          </Box>
        </Grid>

        <Grid xl={3} sm={5}>
          <Box
            mt={2}
            display={{ xs: "none", sm: "block" }}
            width="auto"
            height={300}
          >
            {/* <BookList /> */}
            <AddBook />
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

export default App;
