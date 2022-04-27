
import './App.css';
import Stats from './components/Stats';
import BadgeInfo from './components/BadgeInfo';
import UserTagList from './components/UserTagList';
import ReputationList from './components/ReputationList';

function App() {
  return (
    <div>
      <Stats/>
      <br/>
      <BadgeInfo/>
      <br/>
      <UserTagList/>
      <br/>
      <ReputationList/>
    </div>
  );
}

export default App;
