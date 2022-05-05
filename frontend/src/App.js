import "./App.css";
import { Route, Routes } from "react-router-dom";
import User from "./pages/user.js";
import UserDetail from "./pages/userDetail.js";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import AddTag from "./components/admin/AddTag";
import SearchUser from "./pages/searchUsers";
import CompactUser from "./Atom/CompactUser";
import ReviewQuestions from "./components/admin/ReviewQuestions";
import QuestionDisplayPage from './pages/QuestionDisplayPage';
import Question from './pages/Question';
import AskQuestion from './pages/AskQuestion';
import EditQuestion from './pages/EditQuestion';
import TagsPage from './pages/AllTagsPage/TagsPage'
import TagPage from './pages/TagPage/TagPage'
import Analytics from "./components/admin/Analytics";
import Admin from "./pages/admin/admin";
import Upvote from "./Atom/upvote";


function App() {
  return (
    <Routes>
      <Route exact path="/" element={<SignIn />} />
      <Route exact path="/admin" element={<Admin />} />
      <Route exact path="/user/:userId" element={<User />} />
      <Route exact path="/user/edit/:userId" element={<UserDetail />} />
      <Route exact path="/signin" element={<SignIn />} />
      <Route exact path="/signup" element={<SignUp />} />
      <Route path="/users" element={<SearchUser />} />
      <Route path='/question' element={<Question/>}/>
      <Route path='/askquestion' element={<AskQuestion/>}/>
      <Route path='/edit/:questionId' element={<EditQuestion/>}/>
      <Route path='/tags' element={<TagsPage/>}/>
      <Route path='/tag/:tagId' element={<TagPage/>}/>
      <Route path='/question/:id' element = {<QuestionDisplayPage />}/>
      <Route exact element={Error} />
    </Routes>
  );
}

export default App;