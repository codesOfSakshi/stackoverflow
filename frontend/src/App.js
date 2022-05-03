import "./App.css";
import { Route, Routes } from "react-router-dom";
import User from "./pages/user.js";
import UserDetail from "./pages/userDetail.js";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import AddTag from "./components/admin/AddTag";
import ReviewQuestions from "./components/admin/ReviewQuestions";
import Question from './pages/Question';
import AskQuestion from './pages/AskQuestion';
import TagsPage from './pages/AllTagsPage/TagsPage'
import TagPage from './pages/TagPage/TagPage'
import Analytics from "./components/admin/Analytics";

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<SignIn />} />
      <Route exact path="/tags" element={<AddTag />} />
      <Route exact path="/reviewQuestions" element={<ReviewQuestions />} />
      <Route exact path="/analytics" element={<Analytics />} />
      <Route exact path="/user/:userId" element={<User />} />
      <Route exact path="/user/edit/:userId" element={<UserDetail/>} />
      <Route exact path="/signin" element={<SignIn />} />
      <Route exact path="/signup" element={<SignUp />} />
      <Route path='/question' element={<Question/>}/>
      <Route path='/askquestion' element={<AskQuestion/>}/>
      <Route path='/tags' element={<TagsPage/>}/>
      <Route path='/tag/:tagId' element={<TagPage/>}/>
      <Route exact element={Error} />

    </Routes>
  );
}

export default App;
