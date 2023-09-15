import AddBook from "./components/AddBook";
import BookList from "./components/Booklist";
import "./index.css";
function App() {
  return (
    <>
      <div id="main">
        <BookList />
        <AddBook />
      </div>
    </>
  );
}

export default App;
