
import './App.css';
import {Route, Routes} from 'react-router-dom';
import User from './pages/user.js';
import UserDetail from './pages/userDetail.js';


function App() {
  return (
    <Routes>
        <Route exact path="/user/:userId" element={<User/>} />
        <Route exact path="/user/edit/:userId" element={<UserDetail/>} />
    </Routes>
  );
}

export default App;
