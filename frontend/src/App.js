import "./App.css";
import { Route, Routes } from "react-router-dom";
import User from "./pages/user.js";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
// import ProfileTab from "./components/user/ProfileTab";

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<SignIn />} />
      <Route exact path="/user/:userId" element={<User />} />
      <Route exact path="/signin" element={<SignIn />} />
      <Route exact path="/signup" element={<SignUp />} />
      {/* <Route exact path="/test" element={<ProfileTab />} /> */}
      <Route exact element={Error} />
    </Routes>
  );
}

export default App;
