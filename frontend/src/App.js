import "bootstrap/dist/css/bootstrap.min.css";
// import "./App.css";
import { Routes, Route } from "react-router-dom";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";

function App() {
  return (
    <div className="App">
      <div className="App">
        <Routes>
          <Route exact path="/" element={<SignIn />} />
          <Route exact path="/signin" element={<SignIn />} />
          <Route exact path="/signup" element={<SignUp />} />
          <Route exact element={Error} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
