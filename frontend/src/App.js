import "bootstrap/dist/css/bootstrap.min.css";
// import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";

function App() {
  return (
    <div className="App">
      <div className="App">
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact element={Error} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
