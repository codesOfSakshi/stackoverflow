
import './App.css';
import {Route, Routes} from 'react-router-dom';
import User from './pages/user.js';


function App() {
  return (
    <Routes>
        <Route exact path="/user/:userId" element={<User/>} />
    </Routes>
  );
}

export default App;
