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
import QuestionDisplayPage from "./pages/QuestionDisplayPage";
import Question from "./pages/Question";
import AskQuestion from "./pages/AskQuestion";
import EditQuestion from "./pages/EditQuestion";
import TagsPage from "./pages/AllTagsPage/TagsPage";
import TagPage from "./pages/TagPage/TagPage";
import UserTagPage from "./pages/TagPage/UserTagPage";
import Analytics from "./components/admin/Analytics";
import Admin from "./pages/admin/admin";
import Messaging from "./pages/Messages/Messaging";
import Upvote from "./Atom/upvote";
import QuestionActivity from "./components/questionActivity/questionActivities";
import AllMessages from "./pages/Messages/AllMessages";

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<Question />} />
      <Route exact path="/admin" element={<Admin />} />
      <Route
        exact
        path="/activity/:activityID"
        element={<QuestionActivity />}
      />
      <Route exact path="/user/:userId" element={<User />} />
      <Route exact path="/user/edit/:userId" element={<UserDetail />} />
      <Route exact path="/signin" element={<SignIn />} />
      <Route exact path="/signup" element={<SignUp />} />
      <Route path="/users" element={<SearchUser />} />
      <Route path="/question" element={<Question />} />
      <Route path="/askquestion" element={<AskQuestion />} />
      <Route path="/edit/:questionId" element={<EditQuestion />} />
      <Route path="/tags" element={<TagsPage />} />
      <Route path="/tag/:tagId" element={<TagPage />} />
      <Route path="/usertag/:userId/:tagId" element={<UserTagPage />} />
      <Route path="/question/:id" element={<QuestionDisplayPage />} />
      <Route path="/messaging" element={<Messaging />} />
      <Route path="/allmessages" element={<AllMessages />} />
      <Route exact element={Error} />
    </Routes>
  );
}

export default App;
