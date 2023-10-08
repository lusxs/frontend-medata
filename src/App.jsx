import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<h1>Hello World</h1>} />
          <Route path="/about" element={<h1>About</h1>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
